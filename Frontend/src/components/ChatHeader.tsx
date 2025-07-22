import type { FunctionalComponent } from "preact";

const ChatHeader: FunctionalComponent = () => (
    <header class="flex items-center justify-between bg-gradient-to-r from-indigo-700 to-blue-500 rounded-t-xl px-6 py-4 select-none">
        <h2 class="text-white text-xl font-semibold tracking-wide">Help Chat</h2>
    </header>
);

export default ChatHeader;