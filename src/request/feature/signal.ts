import { ClientRequest } from "http";
import { Feature, Options, Init } from "..";

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

    forFetch(init: Init, options: RequestInit) {
        if (init.signal) {
            options.signal = init.signal;
        }
    }
}