import { Usage } from ".";
import { ApiClient } from "..";

type EmbeddingRequest = {
    model: string;
    input: string;
    user?: string;
};

type Embedding = {
    object: string;
    embedding: number[];
    index: number;
};

type EmbeddingList = {
    object: string;
    data: Embedding[];
    model: string;
    usage: Omit<Usage, "completion_tokens">;
};

export function createEmbedding(client: ApiClient) {
    return async (request: EmbeddingRequest): Promise<EmbeddingList> => {
        return await client("embeddings", { method: "POST", data: request });
    }
}
