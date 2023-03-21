import { ClientRequest } from "http";
import { Feature, Options, Init, FetchOptions } from "..";

declare module ".." {
    interface Init {
        signal?: AbortSignal;
    }
}

export class SignalFeature implements Feature {
    forRequest(init: Init, options: Options) {
        if (init.signal) {
            options.signal = init.signal;
        }
    }

    async forRequestClient(init: Init, client: ClientRequest) {}

    forFetch(init: Init, options: FetchOptions) {
        if (init.signal) {
            options.signal = init.signal;
        }
    }
}