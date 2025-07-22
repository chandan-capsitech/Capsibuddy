export interface FaqOption {
    Question: string;
}

export interface Message {
    sender: "customer" | "bot";
    message: string;
}

export interface StartResponse {
    sessionId: string;
    greet: string;
    questions: FaqOption[];
}

export interface QuestionResponse {
    answer: string;
    options: FaqOption[];
}