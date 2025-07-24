import MessageList from "./MessageList";
import OptionGrid from "./OptionGrid";
import type { Message, FaqOption } from "../types/faq";

type Props = {
    messages: Message[];
    options: FaqOption[];
    onSelect: (q: string) => void;
    inLiveChat: boolean;
    scrollRef: any;
    backAvailable: boolean;           // NEW
    onBack: () => void;
};

const ChatBody = ({ messages, options, onSelect, inLiveChat, scrollRef, backAvailable, onBack }: Props) => (
    <main class="flex-1 bg-white p-1 overflow-y-auto rounded-b-none">
        <MessageList messages={messages} />

        {!inLiveChat && <OptionGrid options={options} onSelect={onSelect} />}
        <div ref={scrollRef} /> 
        {!inLiveChat && backAvailable && (
            <button
                onClick={onBack}
                class="absolute left-2 bottom-20 font-normal text-[#43319A]"
                style={{ zIndex: 10 }}
            >
                ← Back
            </button>
        )}
    </main>
);

export default ChatBody;