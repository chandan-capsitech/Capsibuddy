import type { Message } from "../types/faq";

type Props = { messages: Message[] };

const MessageList = ({ messages }: Props) => (
  <div class="space-y-3 px-1 py-2 max-h-105 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400">
    {messages.map((msg, i) => (
      <div
        key={i}
        class={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
      >
        <div
          class={`p-2 max-w-[70%] break-words text-sm font-normal
            ${msg.sender === "customer"
              ? "text-[#44329B] border-1 rounded-b-2xl rounded-tl-2xl  border-[#44329B]"
              : "bg-[#F4F4F4] rounded-b-2xl rounded-tr-2xl text-[#171717]"}`}
        >
          {msg.message}
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;