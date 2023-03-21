import { RequestOptions as HttpsRequestOptions } from "https";
import { RequestOptions as HttpRequestOptions, ClientRequest, IncomingMessage } from "http";
import requestFeature from "./feature";
import { ReadStream } from "fs";

export type Options = HttpsRequestOptions | HttpRequestOptions;

export interface Init {
}

export type Format = 'json' | 'text' | 'original';

export interface Feature {
    forRequest: (init: Init, options: Options) => void;
    forRequestClient: (init: Init, client: ClientRequest) => Promise<void>;
    forFetch: (init: Init, options: FetchOptions) => void;
}

export type FetchOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    signal?: AbortSignal;
};

export type Response = {
    status: number;
    statusText: string;
    headers: Record<string, string | string[] | undefined>;
    body: any;
};

export class StreamFile {
    public name: string;

    public stream: Blob | ReadStream;

    constructor(file: string | Blob) {
        if (typeof file === "string") {
            const { createReadStream } = require("fs");
            this.stream = createReadStream(file);
            this.name = this.basename(file);
        } else {
            this.stream = file;
            this.name = this.basename(file.name);
        }
    }

    private basename(path: string): string {
        return path.split(/[\\/]/).pop() || "";
    }
}

export function readFile(file: string | Blob) {
    return new StreamFile(file);
}

export async function request(url: string, init: Init, format: Format): Promise<Response> {
    const response: Response = {
        status: 200,
        statusText: "OK",
        headers: {},
        body: null,
    };

    if (typeof fetch === "function") {
        const options: FetchOptions = {};
        await requestFeature(async (feature) => feature.forFetch(init, options));

        const resp = await fetch(url, options);
        response.status = resp.status;
        response.statusText = resp.statusText;
        resp.headers.forEach((value, key) => {
            response.headers[key.toLocaleLowerCase()] = value;
        });

        if (format === "json") {
            if (!resp.headers.get("content-type")?.match(/^application\/json/)) {
                throw new Error(`Unexpected Content-Type: ${resp.headers.get("content-type")}`);
            }

            response.body = await resp.json();
        } else if (format === "text") {
            if (!resp.headers.get("content-type")?.match(/^text\//)) {
                throw new Error(`Unexpected Content-Type: ${resp.headers.get("content-type")}`);
            }

            response.body = await resp.text();
        } else {
            response.body = resp;
        }

        return response;
    } else {
        const { request: requestClient } = await import("https");
        const { request: httpRequestClient } = await import("http");

        const isHttps = url.startsWith("https://");
        const client = isHttps ? requestClient : httpRequestClient;

        const options: Options = {};
        await requestFeature(async (feature) => feature.forRequest(init, options));
        const req = client(url, options);
        await requestFeature(async (feature) => feature.forRequestClient(init, req));

        return new Promise((resolve, reject) => {
            req.on("response", (res: IncomingMessage) => {
                response.status = res.statusCode || 200;
                response.statusText = res.statusMessage || "OK";
                response.headers = res.headers;

                if (format === "original") {
                    response.body = res;
                    resolve(response);
                } else {
                    const chunks: Uint8Array[] = [];
                    res.on("data", (chunk: Uint8Array) => chunks.push(chunk));
                    res.on("end", () => {
                        const data = Buffer.concat(chunks).toString();
                        if (format === "json") {
                            if (!res.headers["content-type"]?.match(/^application\/json/)) {
                                return reject(new Error(`Unexpected Content-Type: ${res.headers["content-type"]}`));
                            }

                            response.body = JSON.parse(data);
                        } else {
                            if (!res.headers["content-type"]?.match(/^text\//)) {
                                return reject(new Error(`Unexpected Content-Type: ${res.headers["content-type"]}`));
                            }

                            response.body = data;
                        }

                        resolve(response);
                    });
                }
            });

            req.on("error", reject);
            req.end();
        });
    }
}