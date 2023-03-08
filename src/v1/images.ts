import { createReadStream } from "fs";
import { ApiClient } from "..";
import FormData from "form-data";

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
    return async (request: CreateImageRequest): Promise<Image> => {
        return await client("images/generations", { method: "POST", data: request });
    }
}

export function editImage(client: ApiClient) {
    return async (request: EditImageRequest, image: string, mask?: string): Promise<Image> => {
        const form = new FormData();

        for (const key in request) {
            form.append(key, '' + request[key as keyof EditImageRequest]);
        }

        form.append('image', createReadStream(image));

        if (mask) {
            form.append('mask', createReadStream(mask));
        }

        return await client("images/edits", { method: "POST", data: form });
    }
}

export function createImageVariation(client: ApiClient) {
    return async (request: CreateImageVariationRequest, image: string): Promise<Image> => {
        const form = new FormData();

        for (const key in request) {
            form.append(key, '' + request[key as keyof CreateImageVariationRequest]);
        }

        form.append('image', createReadStream(image));

        return await client("images/variations", { method: "POST", data: form });
    }
}