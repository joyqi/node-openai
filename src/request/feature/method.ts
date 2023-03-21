import { ClientRequest } from "http";
import { Feature, Options, Init, FetchOptions } from "..";

declare module ".." {
    interface Init {
        method?: string;
    }
}

export class MethodFeature implements Feature {
    forRequest(init: Init, options: Options) {
        options.method = init.method || "GET";
    }

    async forRequestClient(init: Init, client: ClientRequest) {}

    forFetch(init: Init, options: FetchOptions) {
        options.method = init.method || "GET";
    }
}