import { ApiClient } from "..";

type ModerationRequest = {
    input: string;
    model?: string;
};

type ModerationResultCategories = {
    [key: string]: boolean;
};

type ModerationResultCategoryScores = {
    [key: string]: number;
};

type ModerationResult = {
    categories: ModerationResultCategories;
    category_scores: ModerationResultCategoryScores;
    flagged: boolean;
}

type Moderation = {
    id: string;
    model: string;
    results: ModerationResult[];
};

export function createModeration(client: ApiClient) {
    return async (data: ModerationRequest): Promise<Moderation> => {
        return client("moderations", { method: "POST", data });
    };
}