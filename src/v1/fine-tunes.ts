import { ApiClient } from "..";
import { FileObject } from "./files";

type FineTuneHyperparameters = {
    learning_rate_multiplier: number;
    prompt_loss_weight: number;
    batch_size: number;
    n_epochs: number;
};

type FineTuneRequest = {
    training_file: string;
    validation_file?: string;
    model?: string;
    compute_classification_metrics?: boolean;
    classification_n_classes?: number;
    classification_positive_class?: string;
    classification_betas?: number[];
    suffix?: string;
} & FineTuneHyperparameters;

type FineTuneEvent = {
    object: "fine-tune-event";
    created_at: number;
    level: string;
    message: string;
}

type FineTune = {
    id: string;
    object: "fine-tune";
    model: string;
    created_at: number;
    fine_tuned_model: string | null;
    hyperparameters: FineTuneHyperparameters;
    organization_id: string;
    result_files: FileObject[];
    status: string;
    validation_files: FileObject[];
    training_files: FileObject[];
    updated_at: number;
    events: FineTuneEvent[];
};

type FineTuneList = {
    object: "list";
    data: Omit<FineTune, 'events'>[];
};

type FineTuneEvents = {
    object: "list";
    data: FineTuneEvent[];
};

export function createFineTune(client: ApiClient) {
    return async (data: FineTuneRequest): Promise<FineTune> => {
        return await client("fine-tunes", { method: "POST", data });
    }
}

export function retrieveFineTune(client: ApiClient) {
    return async (id: string): Promise<FineTune> => {
        return await client(`fine-tunes/${id}`, { method: "GET" });
    }
}

export function listFineTunes(client: ApiClient) {
    return async (): Promise<FineTuneList> => {
        return await client("fine-tunes", { method: "GET" });
    }
}

export function cancelFineTune(client: ApiClient) {
    return async (id: string): Promise<FineTune> => {
        return await client(`fine-tunes/${id}/cancel`, { method: "POST" });
    }
}

export function listFineTuneEvents(client: ApiClient) {
    return async (id: string): Promise<FineTuneEvents> => {
        return await client(`fine-tunes/${id}/events`, { method: "GET" });
    }
}