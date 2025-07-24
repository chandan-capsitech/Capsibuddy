import axios from "axios";
import type { StartResponse, QuestionResponse } from "../types/faq";

const BACKEND = "http://localhost:5151/api/Faqs";

export function startChat() {
    return axios.post<StartResponse>(`${BACKEND}/start`);
}

export function getByQuestion(payload: { Question: string; SessionId: string; Sender: string }) {
    return axios.post<QuestionResponse>(`${BACKEND}/getByQuestion`, payload);
}