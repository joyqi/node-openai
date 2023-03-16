import { ApiClient } from "..";
import { Usage } from ".";

type ChatRole = "user" | "system" | "assistant";

type ChatMessage = {
    role: ChatRole;
    content: string;
};

type ChatRequest = {
    model: string;
    messages: ChatMessage[];
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string[];
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: { [key: string]: number };
    user?: string;
};

type Choice = {
    index: number;
    message: ChatMessage;
    finish_reason: string;
};

type Chat = {
    id: string;
    object: "chat.completion";
    created: number;
    choices: Choice[];
    usage: Usage;
};

export function createChat(client: ApiClient) {
    return async (data: ChatRequest): Promise<Chat> => {
        return await client("chat/completions", { method: "POST", data }, !!data.stream);
    }
}