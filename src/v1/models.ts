import { ApiClient } from "..";

type Permission = {
    id: string;
    object: string;
    created: number;
    allow_create_engine: boolean;
    allow_sampling: boolean;
    allow_logprobs: boolean;
    allow_search_indices: boolean;
    allow_view: boolean;
    allow_fine_tuning: boolean;
    organization: string;
    group: string | null;
    is_blocking: boolean;
}

type Model = {
    id: string;
    object: string;
    owned_by: string;
    permission: Permission[];
    root: string;
    parent: string | null;
};

type ModelList = {
    data: Model[];
    object: string;
};

export function listModels(client: ApiClient) {
    return async () => {
        const list: ModelList = await client("models", { method: "GET" });
        return list.data;
    }
}

export function retrieveModel(client: ApiClient) {
    return async (id: string): Promise<Model> => {
        return await client(`models/${id}`, { method: "GET" });
    }
}