// Simulate typing delay based on message length
export const getTypingDelay = (text: string): number => {
    const baseDelay = 1000; // 1 second base
    const charDelay = 30; // 30ms per character
    return Math.min(baseDelay + (text.length * charDelay), 2000);
};

// Random delay for more natural feel
export const getRandomDelay = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Delay utility function
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};