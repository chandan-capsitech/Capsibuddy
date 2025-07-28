export interface FaqOption {
    question: string;
}

export interface Message {
    sender: "customer" | "bot";
    message: string;
    isLoading?: boolean;
}

export interface StartResponse {
    result: any;
    sessionId: string;
    greet: string;
    questions: FaqOption[];
}

export interface QuestionResponse {
    result: any;
    answer: string;
    options: FaqOption[];
}

export interface Prop {
    onClose: () => void;
}