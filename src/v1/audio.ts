import { createReadStream } from "fs";
import { ApiClient } from "..";
import FormData from "form-data";

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
    return async (request: CreateAudioTranscriptionRequest, file: string): Promise<Audio> => {
        const form = new FormData();

        for (const key in request) {
            form.append(key, '' + request[key as keyof CreateAudioTranscriptionRequest]);
        }

        form.append('file', createReadStream(file));

        return await client("audio/transcriptions", { method: "POST", data: form });
    }
}

export function createAudioTranslation(client: ApiClient) {
    return async (request: CreateAudioTranslationRequest, file: string): Promise<Audio> => {
        const form = new FormData();

        for (const key in request) {
            form.append(key, '' + request[key as keyof CreateAudioTranslationRequest]);
        }

        form.append('file', createReadStream(file));

        return await client("audio/translations", { method: "POST", data: form });
    }
}
