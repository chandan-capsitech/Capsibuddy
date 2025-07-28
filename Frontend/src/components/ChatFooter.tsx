import type { FunctionalComponent } from "preact";

type Props = {
    inLiveChat: boolean;
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    canSend: boolean;
    onEscalate: () => void;
};

const ChatFooter: FunctionalComponent<Props> = ({
    inLiveChat,
    input,
    setInput,
    onSend,
    canSend,
}) => {
    return (
        <footer class="bg-white rounded-b-3xl px-2 py-3 flex flex-col gap-4 border-1 border-white border-t-gray-100">
            <div class="flex border-1 border-gray-200 focus:ring-1 focus:ring-gray-100 rounded-xl">
                <input
                    value={input}
                    onInput={(e) => setInput((e.target as HTMLInputElement).value)}
                    type="text"
                    placeholder={inLiveChat ? "Let's share something" : "Talk to someone to enable chat"}
                    onKeyDown={(e) => e.key === "Enter" && canSend && onSend()}
                    disabled={!inLiveChat}
                    class="flex-1 px-3 py-2 outline-none"
                    aria-label="Chat input"
                />
                <button
                    onClick={onSend}
                    disabled={!inLiveChat}
                    class="rounded-lg px-2 text-white font-semibold transition"
                >
                    <img src="Button.png" alt="" />
                </button>
            </div>
        </footer>
    );
}
export default ChatFooter;