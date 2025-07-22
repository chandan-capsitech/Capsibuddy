import type { FunctionalComponent } from "preact";

interface Props {
    inLiveChat: boolean;
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    canSend: boolean;
    onEscalate: () => void;
    backAvailable: boolean;
    onBack: () => void;
}

const ChatFooter: FunctionalComponent<Props> = ({
    inLiveChat,
    input,
    setInput,
    onSend,
    canSend,
    onEscalate,
    backAvailable,
    onBack,
}) => (
    <footer class="bg-white border-t border-gray-200 rounded-b-xl px-6 py-4 flex flex-col gap-4">
        {!inLiveChat && (
            <div class="flex flex-wrap justify-between gap-3">
                {backAvailable && (
                    <button
                        onClick={onBack}
                        class="flex-1 rounded-md bg-gray-200 text-gray-700 py-2 font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Back
                    </button>
                )}
                <button
                    onClick={onEscalate}
                    class="flex-1 rounded-md bg-gradient-to-r from-pink-600 via-red-600 to-yellow-400 text-white py-2 font-bold shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400"
                >
                    Talk to someone
                </button>
            </div>
        )}
        {inLiveChat && (
            <div class="flex gap-4">
                <input
                    type="text"
                    value={input}
                    onInput={(e) => setInput((e.target as HTMLInputElement).value)}
                    onKeyDown={(e) => e.key === "Enter" && canSend && onSend()}
                    placeholder="Type your message…"
                    class="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Message input"
                />
                <button
                    onClick={onSend}
                    disabled={!canSend}
                    class="rounded-md bg-indigo-600 px-5 py-2 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-colors"
                    aria-label="Send message"
                >
                    Send
                </button>
            </div>
        )}
    </footer>
);

export default ChatFooter;