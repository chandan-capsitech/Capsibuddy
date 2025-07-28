import { useEffect, useState } from "preact/hooks";
import { createSignalRConnection } from "../utils/signalR";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { startChat, getByQuestion, saveChatMessage } from "../api/faqApi";
import type { Message, FaqOption } from "../types/faq";
import { delay, getTypingDelay, getRandomDelay } from "../utils/delays";

type Props = { onClose: () => void };

const ChatWidget = ({ onClose }: Props) => {
    const [sessionId, setSessionId] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [options, setOptions] = useState<FaqOption[]>([]);
    const [faqStack, setFaqStack] = useState<{ question: string; options: FaqOption[] }[]>([]);
    const [liveChat, setLiveChat] = useState(false);
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState<any>(null);

    // Loading states
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    // Chat session start
    useEffect(() => {
        startChat().then(async res => {

            setSessionId(res.data.result.sessionId);

            // Show typing indicator before greeting
            setIsTyping(true);

            // Delay based on greeting message length
            await delay(getTypingDelay(res.data.result.greet));
            setIsTyping(false);

            // Add greeting message
            setMessages([{ sender: "bot", message: res.data.result.greet }]);

            // Delay before showing options
            await delay(getRandomDelay(600, 1000));
            setOptions(res.data.result.questions);
            setShowOptions(true);
            setFaqStack([]);
        });
    }, []);

    // SignalR live chat
    useEffect(() => {
        if (!liveChat || !sessionId) return;
        const conn = createSignalRConnection(sessionId);
        conn.start().then(() => {
            conn.on("ReceiveMessage", async (_: string, sender: string, message: string) => {
                // Show typing indicator for received messages
                setIsTyping(true);
                await delay(getTypingDelay(message));
                setIsTyping(false);
                setMessages(prev => [...prev, { sender: sender as "customer" | "bot", message }]);

                // Save received message to DB
                try {
                    await saveChatMessage({
                        sessionId,
                        sender,
                        message
                    });
                } catch (error) {
                    console.error("Failed to save received message:", error);
                }
            });
        });
        setConnection(conn);
        return () => {
            conn.stop();
        };
    }, [liveChat, sessionId]);

    // Option click
    const onSelect = async (question: string, escalate?: boolean) => {
        try {
            // Immediately show user's message
            // setMessages((prev) => [...prev, { sender: "customer", message: question }]);
            setShowOptions(false); // Hide options while processing
            if (escalate) {
                // Show typing indicator for escalation
                setIsTyping(true);
                await delay(getRandomDelay(600, 1000));
                setIsTyping(false);
                // User chose to talk to a real person
                setLiveChat(true);
                const escalationMessage = "Thanks for joining us! Let's start by getting your name.";
                setMessages((prev) => [
                    ...prev,
                    { sender: "customer", message: question },
                    { sender: "bot", message: escalationMessage },
                ]);
                try {
                    await saveChatMessage({
                        sessionId,
                        sender: "customer",
                        message: question
                    });
                    await saveChatMessage({
                        sessionId,
                        sender: "bot",
                        message: escalationMessage
                    });
                }
                catch (error) {
                    console.log("Failed to save message", error);
                }
                setOptions([]); // Remove FAQ options when live chat starts
                return;
            }

            // Show typing indicator
            setIsTyping(true);
            setMessages((prev) => [...prev, { sender: "customer", message: question }]);

            const payload = { Question: question, SessionId: sessionId, Sender: "customer" };
            const res = await getByQuestion(payload);
            const data = res.data.result;

            // Delay based on answer length
            await delay(getTypingDelay(data.answer));
            setIsTyping(false);

            // Add bot's response
            setMessages((prev) => [...prev, { sender: "bot", message: data.answer }]);
            setFaqStack((prev) => [...prev, { question, options }]);

            // Delay before showing new options
            if (data.options && data.options.length >= 0) {
                await delay(getRandomDelay(500, 1000));
                setOptions(data.options);
                setShowOptions(true);
            } else {
                setOptions([]);
                setShowOptions(false);
            }
        } catch (error) {
            console.error("Error fetching FAQ answer:", error);
            setIsTyping(false);
            setMessages((prev) => [...prev, { sender: "bot", message: "Sorry, we couldn’t get an answer. Please try again." }]);
            setShowOptions(true); // show options again in error
        }
    };

    // Back button
    const onBack = async () => {
        if (faqStack.length === 0) return;

        const prev = faqStack[faqStack.length - 1];
        setShowOptions(false);

        setFaqStack(faqStack.slice(0, -1));
        setOptions(prev.options);
        setMessages(msgs => {
            const arr = [...msgs];
            arr.pop();
            arr.pop();
            return arr;
        });
        // Delay before showing previous options
        await delay(getRandomDelay(400, 800));
        setOptions(prev.options);
        setShowOptions(true);
    };

    // Live chat send
    const onSend = async () => {
        if (!connection || !input.trim()) return;
        const message = input.trim();
        setMessages(prev => [...prev, { sender: "customer", message }]);
        connection.invoke("SendMessage", sessionId, "customer", message);

        // Save customer message to DB
        try {
            await saveChatMessage({
                sessionId,
                sender: "customer",
                message
            });
        } catch (error) {
            console.error("Failed to save customer message:", error);
        }

        setInput("");
    };

    return (
        <div class="fixed bottom-20 right-6 sm:bottom-30 sm:right-8 w-[300px] sm:w-[400px] h-[580px] sm:h-[618px] z-50 flex flex-col bg-white rounded-3xl shadow-2xl">
            <ChatHeader
                onClose={onClose}
                inLiveChat={liveChat}
                backAvailable={!liveChat && faqStack.length > 0}
                onBack={onBack}
            />
            <ChatBody
                messages={messages}
                options={options}
                onSelect={onSelect}
                inLiveChat={liveChat}
                isTyping={isTyping}
                showOptions={showOptions}
            />
            <ChatFooter
                inLiveChat={liveChat}
                input={input}
                setInput={setInput}
                onSend={onSend}
                canSend={!!input.trim()}
                onEscalate={() => setLiveChat(true)}
            />
        </div>
    );
};

export default ChatWidget;