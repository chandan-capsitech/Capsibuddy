type Props = {
    onOpen: () => void;
    isOpen: boolean;
};

const ChatLauncher = ({ onOpen, isOpen }: Props) => (
    <button
        onClick={onOpen}
        aria-label="Open chat"
        class="fixed bottom-3 right-4 sm:bottom-8 sm:right-8 z-50 rounded-full shadow-lg p-2 sm:p-4 transition-transform hover:scale-110 "
    >
        {isOpen ? (
            <img src="close.png" alt="" />
        ) : (
            <img src="logo.png" alt="" />
        )}
    </button>
);

export default ChatLauncher;