import * as v1 from "./v1";
import { Init, request } from "./request";

// ApiConfig defines the configuration options for the OpenAI API
export type ApiConfig = {
    apiKey: string;
    organization?: string;
    endpoint?: string;
    options?: ApiInit;
};

export type ApiInit = Omit<Init, "signal">;

// ApiVersion defines the version of the OpenAI API
export type ApiVersion = "v1" | "v2";

export type ApiClient = (path: string, options: Init, direct?: boolean) => Promise<any>;

// OpenAI is the main class for the OpenAI API
export class OpenAI {

    constructor(private config: ApiConfig) {}

    v1() {
        const client = this.makeClient("v1");

        return {
            models: {
                list: v1.listModels(client),
                retrieve: v1.retrieveModel(client),
                delete: v1.deleteModel(client),
            },
            completions: {
                create: v1.createCompletion(client)
            },
            chat: {
                create: v1.createChat(client)
            },
            edits: {
                create: v1.createEdit(client)
            },
            images: {
                create: v1.createImage(client),
                edit: v1.editImage(client),
                createVariation: v1.createImageVariation(client)
            },
            embeddings: {
                create: v1.createEmbedding(client)
            },
            audio: {
                createTranscription: v1.createAudioTranscription(client),
                createTranslation: v1.createAudioTranslation(client)
            },
            files: {
                list: v1.listFiles(client),
                retrieve: v1.retrieveFile(client),
                upload: v1.uploadFile(client),
                delete: v1.deleteFile(client),
                retrieveContent: v1.retrieveFileContent(client)
            },
            fineTunes: {
                create: v1.createFineTune(client),
                list: v1.listFineTunes(client),
                retrieve: v1.retrieveFineTune(client),
                cancel: v1.cancelFineTune(client),
                listEvents: v1.listFineTuneEvents(client),
            },
            moderations: {
                create: v1.createModeration(client)
            },
        };
    }

    // Generate a client for the given version of the OpenAI API
    private makeClient(version: ApiVersion): ApiClient {
        return async (path: string, options: Init, direct = false) => {
            if (this.config.options) {
                options = Object.assign(this.config.options, options);
            }

            const headers: Record<string, string> = {
                Authorization: `Bearer ${this.config.apiKey}`,
            };

            if (this.config.organization) {
                headers["OpenAI-Organization"] = this.config.organization;
            }

            options.headers = Object.assign(headers, options.headers || {});

            const endpoint = this.config.endpoint || "https://api.openai.com";
            const url = `${endpoint}/${version}/${path}`;
            const response = await request(url, options, direct ? "original" : "json");

            if (response.status !== 200) {
                throw new Error(direct ? response.statusText : response.body.error.message);
            }

            return response.body;
        }
    }
}
