import MessageList from "./MessageList";
import OptionGrid from "./OptionGrid";
import type { Message, FaqOption } from "../types/faq";

type Props = {
    messages: Message[];
    options: FaqOption[];
    onSelect: (q: string) => void;
    inLiveChat: boolean;
    scrollRef: any;
};

const ChatBody = ({ messages, options, onSelect, inLiveChat, scrollRef }: Props) => (
    <main class="flex-1 bg-white py-2 px-1 overflow-y-auto rounded-b-none">
        <MessageList messages={messages} />
        {!inLiveChat && <OptionGrid options={options} onSelect={onSelect} />}
        <div ref={scrollRef} />
    </main>
);

export default ChatBody;