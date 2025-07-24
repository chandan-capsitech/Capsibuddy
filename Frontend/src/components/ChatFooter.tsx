type Props = {
    inLiveChat: boolean;
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    canSend: boolean;
    onEscalate: () => void;
    backAvailable: boolean;
    onBack: () => void;
};

const ChatFooter = ({
    inLiveChat,
    input,
    setInput,
    onSend,
    canSend,
    onEscalate,
    backAvailable,
    onBack,
}: Props) => (
    <footer class="bg-white rounded-b-3xl px-2 py-3 flex flex-col gap-4 border-1 border-white border-t-gray-100">
        {!inLiveChat && (
            <div class="flex w-full gap-3 mb-2">
                {backAvailable && (
                    <button
                        onClick={onBack}
                        class="flex-1 rounded-lg bg-gray-200 py-2 font-medium hover:bg-gray-300 transition ring-1 ring-gray-200"
                    >
                        Back
                    </button>
                )}
                <button
                    onClick={onEscalate}
                    class="flex-1 rounded-lg bg-gradient-to-r from-pink-600 via-red-600 to-yellow-400 text-white py-2 font-bold shadow-lg transition focus:outline-none hover:scale-105"
                >
                    Talk to someone
                </button>
            </div>
        )}
        {inLiveChat && (
            <div class="flex border-1 border-gray-200 focus:ring-1 focus:ring-gray-100 rounded-xl">
                <input
                    value={input}
                    onInput={(e) => setInput((e.target as HTMLInputElement).value)}
                    type="text"
                    placeholder="Let's share something"
                    onKeyDown={(e) => e.key === "Enter" && canSend && onSend()}
                    class="flex-1 px-3 py-2 outline-none"
                />
                <button
                    onClick={onSend}
                    disabled={!canSend}
                    class={`rounded-lg px-2 text-white font-semibold 
            ${!canSend ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <img src="Button.png" alt="" />
                </button>
            </div>
        )}
    </footer>
);

export default ChatFooter;