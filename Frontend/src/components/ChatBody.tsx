import MessageList from "./MessageList";
import OptionGrid from "./OptionGrid";
import type { Message, FaqOption } from "../types/faq";
import { useEffect, useRef } from "preact/hooks";

type Props = {
    messages: Message[];
    options: FaqOption[];
    onSelect: (q: string) => void;
    inLiveChat: boolean;
    isTyping?: boolean;
    showOptions?: boolean;
};

const ChatBody = ({ messages, options, onSelect, inLiveChat, isTyping = false, showOptions = true }: Props) => {
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
    }, [messages, isTyping, options]);

    return (
        <main ref={chatContainerRef} class="flex-1 bg-white py-1 px-1.5 overflow-y-auto rounded-b-none no-scrollbar">
            <MessageList messages={messages} isTyping={isTyping} />
            {!inLiveChat && showOptions && <OptionGrid options={options} onSelect={onSelect} />}
        </main>
    );
}

export default ChatBody;