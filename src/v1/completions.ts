import { Usage } from ".";
import { ApiClient } from "..";

type CompletionRequest = {
    model: string;
    prompt: string;
    suffix?: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    logprobs?: number;
    echo?: boolean;
    stop?: string[];
    presence_penalty?: number;
    frequency_penalty?: number;
    best_of?: number;
    logit_bias?: { [key: string]: number };
    user?: string;
};

type Choice = {
    text: string;
    index: number;
    logprobs: { [key: string]: number };
    finish_reason: string;
};

type Completion = {
    id: string;
    object: "text_completion";
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
};

export function createCompletion(client: ApiClient) {
    return async (data: CompletionRequest): Promise<Completion> => {
        return await client("completions", { method: "POST", data }, !!data.stream);
    }
}