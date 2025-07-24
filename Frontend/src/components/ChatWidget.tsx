import { useEffect, useState, useRef } from "preact/hooks";
import { createSignalRConnection } from "../utils/signalR";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { startChat, getByQuestion } from "../api/faqApi";
import type { Message, FaqOption } from "../types/faq";

type Props = { onClose: () => void };

const ChatWidget = ({ onClose }: Props) => {
    const [sessionId, setSessionId] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [options, setOptions] = useState<FaqOption[]>([]);
    const [faqStack, setFaqStack] = useState<{ question: string; options: FaqOption[] }[]>([]);
    const [liveChat, setLiveChat] = useState(false);
    const [input, setInput] = useState("");
    const [connection, setConnection] = useState<any>(null);

    // Scroll to last message/option
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, options]);

    // Chat session start
    useEffect(() => {
        startChat().then(res => {
            setSessionId(res.data.result.sessionId);
            setMessages([{ sender: "bot", message: res.data.result.greet }]);
            setOptions(res.data.result.questions);
            setFaqStack([]);
        });
    }, []);

    // SignalR live chat
    useEffect(() => {
        if (!liveChat || !sessionId) return;
        const conn = createSignalRConnection(sessionId);
        conn.start().then(() => {
            conn.on("ReceiveMessage", (_: string, sender: string, message: string) => {
                setMessages(prev => [...prev, { sender: sender as "customer" | "bot", message }]);
            });
        });
        setConnection(conn);
        return () => { conn.stop(); };
    }, [liveChat, sessionId]);

    // Option click
    const onSelect = async (question: string) => {
        setMessages(prev => [...prev, { sender: "customer", message: question }]);
        const payload = { Question: question, SessionId: sessionId, Sender: "customer" };
        const res = await getByQuestion(payload);
        setMessages(prev => [...prev, { sender: "bot", message: res.data.result.answer }]);
        setFaqStack(prev => [...prev, { question, options }]);
        setOptions(res.data.result.options);
    };

    // Back button
    const onBack = () => {
        if (faqStack.length === 0) return;
        const prev = faqStack[faqStack.length - 1];
        setFaqStack(faqStack.slice(0, -1));
        setOptions(prev.options);
        setMessages(msgs => {
            const arr = [...msgs];
            arr.pop(); arr.pop();
            return arr;
        });
    };

    // Live chat send
    const onSend = () => {
        if (!connection || !input.trim()) return;
        const message = input.trim();
        setMessages(prev => [...prev, { sender: "customer", message }]);
        connection.invoke("SendMessage", sessionId, "customer", message);
        setInput("");
    };

    return (
        <div class="fixed bottom-15 right-6 sm:bottom-30 sm:right-8 w-[300px] sm:w-[400px] min-h-[580px] sm:min-h-[618px] z-50 flex flex-col bg-white rounded-3xl shadow-2xl">
            <ChatHeader onClose={onClose}/>
            <ChatBody
                messages={messages}
                options={options}
                onSelect={onSelect}
                inLiveChat={liveChat}
                scrollRef={scrollRef}
            />
            <ChatFooter
                inLiveChat={liveChat}
                input={input}
                setInput={setInput}
                onSend={onSend}
                canSend={!!input.trim()}
                onEscalate={() => setLiveChat(true)}
                backAvailable={!liveChat && faqStack.length > 0}
                onBack={onBack}
            />
            <div ref={scrollRef} />
        </div>
    );
};

export default ChatWidget;