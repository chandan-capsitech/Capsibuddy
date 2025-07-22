import type { FunctionalComponent } from "preact";
import type { Message, FaqOption } from "../types/types";
import MessageList from "./MessageList";
import OptionGrid from "./OptionGrid";

interface Props {
    messages: Message[];
    options: FaqOption[];
    onSelect: (question: string) => void;
    inLiveChat: boolean;
}

const ChatBody: FunctionalComponent<Props> = ({ messages, options, onSelect, inLiveChat }) => (
    <main class="flex-1 bg-white p-4 overflow-y-auto rounded-b-none md:px-6 md:py-4">
        <MessageList messages={messages} />
        {!inLiveChat && options.length > 0 && <OptionGrid options={options} onSelect={onSelect} />}
    </main>
);

export default ChatBody;