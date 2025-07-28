import axios from "axios";
import type { StartResponse, QuestionResponse } from "../types/faq";

const BACKEND = "http://localhost:5151/api/Faqs";
const back = "http://localhost:5151/api";

export function startChat() {
    return axios.post<StartResponse>(`${BACKEND}/start`);
}

export function getByQuestion(payload: { Question: string; SessionId: string; Sender: string }) {
    return axios.post<QuestionResponse>(`${BACKEND}/getByQuestion`, payload);
}

export function saveChatMessage(payload: { sessionId: string; sender: string; message: string }) {
    return axios.post(`${back}/Conversations`, payload);
}