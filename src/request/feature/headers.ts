import { ClientRequest } from "http";
import { Feature, Options, Init } from "..";

declare module ".." {
    interface Init {
        headers?: Record<string, string>;
    }
}

export class HeadersFeature implements Feature {
    forRequest(init: Init, options: Options) {
        if (init.headers) {
            options.headers = {
                ...options.headers,
                ...init.headers,
            }
        }
    }

    async forRequestClient(init: Init, client: ClientRequest) {}

    forFetch(init: Init, options: RequestInit) {
        if (init.headers) {
            options.headers = {
                ...options.headers,
                ...init.headers,
            }
        }
    }
}