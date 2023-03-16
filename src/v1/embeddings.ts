import { Usage } from ".";
import { ApiClient } from "..";

type EmbeddingRequest = {
    model: string;
    input: string;
    user?: string;
};

type Embedding = {
    object: "embedding";
    embedding: number[];
    index: number;
};

type EmbeddingList = {
    object: "list";
    data: Embedding[];
    model: string;
    usage: Omit<Usage, "completion_tokens">;
};

export function createEmbedding(client: ApiClient) {
    return async (data: EmbeddingRequest): Promise<EmbeddingList> => {
        return await client("embeddings", { method: "POST", data });
    }
}
