import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as v1 from "./v1";

// ApiConfig defines the configuration options for the OpenAI API
export type ApiConfig = {
    apiKey: string;
    organization?: string;
    endpoint?: string;
    options?: AxiosRequestConfig;
};

// ApiVersion defines the version of the OpenAI API
export type ApiVersion = "v1" | "v2";

export type ApiClient = (path: string, options: AxiosRequestConfig) => Promise<any>;

// OpenAI is the main class for the OpenAI API
export class OpenAI {
    private config: ApiConfig;

    constructor(cfg: ApiConfig) {
        this.config = Object.assign({
            endpoint: "https://api.openai.com",
            options: {
                headers: {
                    Authorization: `Bearer ${cfg.apiKey}`,
                },
                validateStatus: () => true
            }
        }, cfg);
    }

    v1() {
        const client = this.makeClient("v1");

        return {
            models: {
                list: v1.listModels(client),
                retrieve: v1.retrieveModel(client)
            },
            completions: {
                create: v1.createCompletion(client)
            },
            chat: {
                create: v1.createChat(client)
            }
        };
    }

    // Generate a client for the given version of the OpenAI API
    private makeClient(version: ApiVersion): ApiClient {
        return async (path: string, options: AxiosRequestConfig) => {
            const url = `${this.config.endpoint}/${version}/${path}`;
            const response = await axios(Object.assign({ url }, this.config.options, options));

            if (response.headers["content-type"] !== "application/json") {
                throw new Error(`Unexpected Content-Type: ${response.headers["content-type"]}`);
            } else if (response.status !== 200) {
                throw new Error(response.data.error.message);
            } else {
                return response.data;
            }
        }
    }
}
