import type { FunctionalComponent } from "preact";

interface Props {
    onOpen: () => void;
}

const ChatLauncher: FunctionalComponent<Props> = ({ onOpen }) => (
    <button
        onClick={onOpen}
        aria-label="Open chat"
        class="fixed bottom-8 right-8 z-50 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg p-4 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4C2.897 2 2 2.894 2 4v16l4-4h14c1.103 0 2-.896 2-2V4c0-1.106-.897-2-2-2z" />
        </svg>
    </button>
);

export default ChatLauncher;