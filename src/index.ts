import * as v1 from "./v1";
import fetchPolyfill from "./polyfill/fetch";
import FormDataPolyfill from "./polyfill/formdata";
import { RequestInit as NodeRequestInit } from "node-fetch";

// ApiConfig defines the configuration options for the OpenAI API
export type ApiConfig = {
    apiKey: string;
    organization?: string;
    endpoint?: string;
};

type RequestConfig = RequestInit & NodeRequestInit & {
    data?: any
};

// ApiVersion defines the version of the OpenAI API
export type ApiVersion = "v1" | "v2";

export type ApiClient = (path: string, options: RequestConfig, direct?: boolean) => Promise<any>;

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
        return async (path: string, options: RequestConfig, direct = false) => {
            const headers: any = {
                Authorization: `Bearer ${this.config.apiKey}`,
            };

            if (options.data) {
                options.body = JSON.stringify(options.data);
                delete options.data;
                headers["Content-Type"] = "application/json";
            } else if (options.body && options.body instanceof FormDataPolyfill) {
                headers["Content-Type"] = "multipart/form-data";
            }

            options.headers = Object.assign(headers, options.headers || {});

            const endpoint = this.config.endpoint || "https://api.openai.com";
            const url = `${endpoint}/${version}/${path}`;
            const response = await fetchPolyfill(url, options);

            if (!direct && !response.headers.get("content-type")?.match(/^application\/json/)) {
                throw new Error(`Unexpected Content-Type: ${response.headers.get("content-type")}`);
            } else if (direct) {
                return response.body;
            } else {
                const data = await response.json();
                if (response.status != 200) {
                    throw new Error(direct ? response.statusText : data.error.message);
                } else {
                    return data;
                }
            }
        }
    }
}
