import { useEffect, useState, useRef } from "preact/hooks";
import axios from "axios";
import { createSignalRConnection } from "../utils/signalr";
import type { Message, FaqOption, StartResponse, QuestionResponse } from "../types/types";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const BACKEND = "http://localhost:5151";

const ChatWidget = () => {
    const [sessionId, setSessionId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [options, setOptions] = useState<FaqOption[]>([]);
    const [faqStack, setFaqStack] = useState<{ question: string; options: FaqOption[] }[]>([]);
    const [liveChat, setLiveChat] = useState(false);
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState<any>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, options]);

    // Start session on mount
    useEffect(() => {
        async function start() {
            try {
                const res = await axios.post<StartResponse>(`${BACKEND}/api/faqs/start`);
                console.log(res);
                setSessionId(res.data.sessionId);
                setMessages([{ sender: "bot", message: res.data.greet }]);
                setOptions(res.data.questions);
                setFaqStack([]);
            } catch (e) {
                console.error(e);
                setMessages([{ sender: "bot", message: "Sorry, could not load FAQs." }]);
            }
        }
        start();
    }, []);

    // Setup SignalR when live chat active
    useEffect(() => {
        if (!liveChat || !sessionId) return;

        const conn = createSignalRConnection(sessionId);
        conn.start()
            .then(() => {
                conn.on("ReceiveMessage", (_sessionId, sender, message) => {
                    setMessages((prev) => [...prev, { sender, message }]);
                });
            })
            .catch(console.error);
        setConnection(conn);

        return () => {
            conn.stop();
        };
    }, [liveChat, sessionId]);

    // User selects FAQ question
    const onSelect = async (question: string) => {
        try {
            setMessages((prev) => [...prev, { sender: "customer", message: question }]);
            const payload = {
                sessionId,
                sender: "customer",
                message: question, // <-- must match backend's 'Message' property
            };
            const res = await axios.post<QuestionResponse>(`${BACKEND}/api/faqs/getByQuestion`, payload);
            setMessages((prev) => [...prev, { sender: "bot", message: res.data.answer }]);
            setFaqStack((prev) => [...prev, { question, options }]);
            setOptions(res.data.options);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", message: "Sorry, an error occurred fetching the answer." },
            ]);
        }
    };

    // Send message in live chat
    const onSend = () => {
        if (!connection || !input.trim()) return;
        const message = input.trim();
        setMessages((prev) => [...prev, { sender: "customer", message }]);
        connection.invoke("SendMessage", sessionId, "customer", message);
        setInput("");
    };

    // Navigate back in FAQ stack
    const onBack = () => {
        if (faqStack.length === 0) return;
        const prev = faqStack[faqStack.length - 1];
        setFaqStack(faqStack.slice(0, -1));
        setOptions(prev.options);
        setMessages((msgs) => {
            const arr = [...msgs];
            if (arr.length >= 2) {
                arr.pop();
                arr.pop();
            }
            return arr;
        });
    };

    // Start live chat
    const onEscalate = () => setLiveChat(true);

    return (
        <div class="fixed bottom-20 right-8 w-[400px] max-h-[700px] z-50 flex flex-col bg-white rounded-2xl shadow-2xl ring-1 ring-indigo-200">
            <ChatHeader />
            <ChatBody messages={messages} options={options} onSelect={onSelect} inLiveChat={liveChat} />
            <ChatFooter
                inLiveChat={liveChat}
                input={input}
                setInput={setInput}
                onSend={onSend}
                canSend={!!input.trim()}
                onEscalate={onEscalate}
                backAvailable={!liveChat && faqStack.length > 0}
                onBack={onBack}
            />
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWidget;