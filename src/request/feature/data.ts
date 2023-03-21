import { ClientRequest } from "http";
import { Feature, Options, Init, FetchOptions } from "..";

declare module ".." {
    interface Init {
        data?: any;
    }
}

export class DataFeature implements Feature {
    forRequest(init: Init, options: Options) {
        if (init.data) {
            options.headers = {
                ...options.headers,
                "Content-Type": "application/json",
            };
        }
    }

    async forRequestClient(init: Init, client: ClientRequest) {
        if (init.data) {
            client.write(JSON.stringify(init.data));
        }
    }

    forFetch(init: Init, options: FetchOptions) {
        if (init.data) {
            options.headers = {
                ...options.headers,
                "Content-Type": "application/json",
            };

            options.body = JSON.stringify(init.data);
        }
    }
}