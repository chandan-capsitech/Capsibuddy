import type { Message } from "../types/faq";
import TypingIndicator from "./TypingIndicator";

type Props = {
  messages: Message[];
  isTyping?: boolean;
};

const MessageList = ({ messages, isTyping }: Props) => (
  <div class="space-y-3 px-1 py-2 max-h-screen">
    {messages.map((msg, i) => (
      <div
        key={i}
        class={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
      >
        <div
          class={`sm:py-2 py-1 px-2 sm:px-2 max-w-[70%] break-words text-xs sm:text-sm font-normal
            ${msg.sender === "customer"
              ? "text-[#44329B] border-1 rounded-b-2xl rounded-tl-2xl  border-[#44329B]"
              : "bg-[#F4F4F4] rounded-b-2xl rounded-tr-2xl text-[#171717]"}`}
        >
          {msg.message}
        </div>
      </div>
    ))}
    {isTyping && <TypingIndicator />}
  </div>
);

export default MessageList;