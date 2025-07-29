type Props = {
    onClose?: () => void;
    inLiveChat: boolean;
    backAvailable: boolean;
    onBack: () => void;
};

const ChatHeader = ({ onClose, inLiveChat, backAvailable, onBack }: Props) => (
    <header className="bg-gradient-to-l from-[#A7BEFE] via-[#6E6EC5] to-[#43319A] px-2 py-3 sm:py-6 rounded-t-3xl flex items-center shadow gap-3">
        <div className="flex flex-col gap-2 ml-2">
            <div className="flex flex-row gap-2">
                <h2 className="text-white font-bold text-2xl font-sans">Capsibot</h2>
                <img src="logo.png" alt="" className="h-8 w-8 p-1 bg-white rounded-full" />
                {!inLiveChat && backAvailable && (
                    <button
                        onClick={onBack}
                        className="cursor-pointer font-normal px-2 text-xs sm:text-sm text-white shadow-2xl bg-gradient-to-r from-[#5347AA] to-[#A7BEFE] transparent border-none outline-none rounded-2xl"
                    >
                        ←Back
                    </button>
                )}
            </div>
            <span className="outfit-custom text-white leading-4.5 text-xs sm:text-sm">A live chat interface that allows for seamless, natural communication and connection.</span>

        </div>
        {onClose && (
            <button
                onClick={onClose}
                className="p-2 text-white font-extrabold text-lg hover:bg-[#43319A] rounded-full w-9 h-9 transition focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close chat"
            >
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="5" x2="15" y2="15" />
                    <line x1="15" y1="5" x2="5" y2="15" />
                </svg>
            </button>
        )}
    </header>
);

export default ChatHeader;