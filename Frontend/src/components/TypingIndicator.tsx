const TypingIndicator = () => (
    <div class="flex justify-start">
        <div class="px-4 py-3 max-w-[70%]">
            <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        </div>
    </div>
);

export default TypingIndicator;