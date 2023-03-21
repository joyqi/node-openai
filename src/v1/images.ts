import { ApiClient } from "..";
import { readFile } from "../request";

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
    return async (request: EditImageRequest, image: string | Blob, mask?: string | Blob): Promise<Image> => {
        const form: Record<string, any> = {};

        for (const key in request) {
            form[key] = request[key as keyof EditImageRequest];
        }

        form['image'] = readFile(image);

        if (mask) {
            form['mask'] = readFile(mask);
        }

        return await client("images/edits", { method: "POST", form });
    }
}

export function createImageVariation(client: ApiClient) {
    return async (request: CreateImageVariationRequest, image: string | Blob): Promise<Image> => {
        const form: Record<string, any> = {};

        for (const key in request) {
            form[key] = request[key as keyof CreateImageVariationRequest];
        }

        form['image'] = readFile(image);

        return await client("images/variations", { method: "POST", form });
    }
}