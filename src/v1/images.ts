import { ApiClient } from "..";
import FormDataPolyfill from "../polyfill/formdata";
import readFile from "../polyfill/readfile";

type ImageSize = '256x256' | '512x512' | '1024x1024';

type ImageResponseFormat = 'url' | 'b64_json';

type CreateImageRequest = {
    prompt: string;
    n?: number;
    size?: ImageSize;
    response_format?: ImageResponseFormat;
    user?: string;
};

type EditImageRequest = {
    prompt: string;
    n?: number;
    size?: ImageSize;
    response_format?: ImageResponseFormat;
    user?: string;
};

type CreateImageVariationRequest = {
    n?: number;
    size?: ImageSize;
    response_format?: ImageResponseFormat;
    user?: string;
};

type ImageData = Partial<{
    [key in ImageResponseFormat]: string;
}>;

type Image = {
    created: number;
    data: ImageData[];
};

export function createImage(client: ApiClient) {
    return async (data: CreateImageRequest): Promise<Image> => {
        return await client("images/generations", { method: "POST", data });
    }
}

export function editImage(client: ApiClient) {
    return async (request: EditImageRequest, image: string | File, mask?: string | File): Promise<Image> => {
        const body = new FormDataPolyfill();

        for (const key in request) {
            body.append(key, '' + request[key as keyof EditImageRequest]);
        }

        body.append('image', await readFile(image));

        if (mask) {
            body.append('mask', await readFile(mask));
        }

        return await client("images/edits", { method: "POST", body });
    }
}

export function createImageVariation(client: ApiClient) {
    return async (request: CreateImageVariationRequest, image: string | File): Promise<Image> => {
        const body = new FormData();

        for (const key in request) {
            body.append(key, '' + request[key as keyof CreateImageVariationRequest]);
        }

        body.append('image', await readFile(image));

        return await client("images/variations", { method: "POST", body });
    }
}