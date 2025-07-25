import MessageList from "./MessageList";
import OptionGrid from "./OptionGrid";
import type { Message, FaqOption } from "../types/faq";
import { useEffect, useRef } from "preact/hooks";

type Props = {
    messages: Message[];
    options: FaqOption[];
    onSelect: (q: string) => void;
    inLiveChat: boolean;
    backAvailable: boolean;
    onBack: () => void;
};

const ChatBody = ({ messages, options, onSelect, inLiveChat, backAvailable, onBack }: Props) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 20);

        return () => clearTimeout(timer);
    }, [messages, options]);

    return (
        <main ref={chatContainerRef} class="flex-1 bg-white p-1 overflow-y-auto rounded-b-none no-scrollbar">
            <MessageList messages={messages} />
            {!inLiveChat && <OptionGrid options={options} onSelect={onSelect} />}
            {!inLiveChat && backAvailable && (
                <button
                    onClick={onBack}
                    class="absolute left-2 bottom-20 font-normal text-sm text-[#43319A]"
                    style={{ zIndex: 10 }}
                >
                    ← Back
                </button>
            )}
        </main>
    );
}

export default ChatBody;