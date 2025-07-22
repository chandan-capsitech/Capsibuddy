import type { FunctionalComponent } from "preact";
import type { Message } from "../types/types";

interface Props {
    messages: Message[];
}

const MessageList: FunctionalComponent<Props> = ({ messages }) => (
    <div class="space-y-3 px-4 py-2 max-h-[45vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100" role="log" aria-live="polite">
        {messages.map((msg, i) => (
            <div
                key={i}
                class={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
            >
                <div
                    class={`rounded-lg px-4 py-3 max-w-[75%] break-words whitespace-pre-wrap text-sm shadow-md 
            ${msg.sender === "customer"
                            ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white"
                            : "bg-indigo-100 text-indigo-900"}`}
                    aria-label={`${msg.sender === "customer" ? "You" : "Bot"} says: ${msg.message}`}
                >
                    {msg.message}
                </div>
            </div>
        ))}
    </div>
);

export default MessageList;