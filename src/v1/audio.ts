import { ApiClient } from "..";
import { readFile } from "../request";

type AudioResponseFormat = 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt';

type CreateAudioTranscriptionRequest = {
    model: string;
    prompt?: string;
    response_format?: AudioResponseFormat;
    temperature?: number;
    language?: string;
};

type CreateAudioTranslationRequest = {
    model: string;
    prompt?: string;
    response_format?: AudioResponseFormat;
    temperature?: number;
};

type Audio = Partial<{
    [key in AudioResponseFormat]: string;
}>;

export function createAudioTranscription(client: ApiClient) {
    return async (request: CreateAudioTranscriptionRequest, file: string | Blob): Promise<Audio> => {
        const form: Record<string, any> = {};

        for (const key in request) {
            form[key] = request[key as keyof CreateAudioTranscriptionRequest];
        }

        form['file'] = readFile(file);
        return await client("audio/transcriptions", { method: "POST", form });
    }
}

export function createAudioTranslation(client: ApiClient) {
    return async (request: CreateAudioTranslationRequest, file: string | Blob): Promise<Audio> => {
        const form: Record<string, any> = {};

        for (const key in request) {
            form[key] = request[key as keyof CreateAudioTranslationRequest];
        }

        form['file'] = readFile(file);
        return await client("audio/translations", { method: "POST", form });
    }
}
