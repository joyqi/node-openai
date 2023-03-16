import { ApiClient } from "..";
import FormDataPolyfill from "../polyfill/formdata";
import readFile from "../polyfill/readfile";

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
    return async (request: CreateAudioTranscriptionRequest, file: string | File): Promise<Audio> => {
        const body = new FormData();

        for (const key in request) {
            body.append(key, '' + request[key as keyof CreateAudioTranscriptionRequest]);
        }

        body.append('file', await readFile(file));

        return await client("audio/transcriptions", { method: "POST", body });
    }
}

export function createAudioTranslation(client: ApiClient) {
    return async (request: CreateAudioTranslationRequest, file: string | File): Promise<Audio> => {
        const body = new FormDataPolyfill();

        for (const key in request) {
            body.append(key, '' + request[key as keyof CreateAudioTranslationRequest]);
        }

        body.append('file', await readFile(file));

        return await client("audio/translations", { method: "POST", body });
    }
}
