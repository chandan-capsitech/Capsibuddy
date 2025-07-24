type Props = { onOpen: () => void };

const ChatLauncher = ({ onOpen }: Props) => (
    <button
        onClick={onOpen}
        aria-label="Open chat"
        class="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 rounded-full shadow-lg p-4 transition-transform hover:scale-110 "
    >
        <img src="logo.png" alt="" className="w-full h-full" />
    </button>
);

export default ChatLauncher;