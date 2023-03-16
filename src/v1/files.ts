import { ApiClient } from "..";
import FormDataPolyfill from "../polyfill/formdata";
import readFile from "../polyfill/readfile";

export type FileObject = {
    id: string;
    object: "file";
    bytes: number;
    created_at: number;
    filename: string;
    purpose: string;
};

type DeletedFile = {
    id: string;
    object: string;
    deleted: boolean;
};

type FileList = {
    data: FileObject[];
    object: "list";
};

export function listFiles(client: ApiClient) {
    return async (): Promise<FileList> => {
        return await client("files", { method: "GET" });
    }
}

export function uploadFile(client: ApiClient) {
    return async (file: string | File, purpose: string): Promise<FileObject> => {
        const body = new FormDataPolyfill();

        body.append('purpose', purpose);
        body.append('file', await readFile(file));

        return await client("files", { method: "POST", body });
    }
}

export function deleteFile(client: ApiClient) {
    return async (id: string): Promise<DeletedFile> => {
        return await client(`files/${id}`, { method: "DELETE" });
    }
}

export function retrieveFile(client: ApiClient) {
    return async (id: string): Promise<FileObject> => {
        return await client(`files/${id}`, { method: "GET" });
    }
}

export function retrieveFileContent(client: ApiClient) {
    return async (id: string): Promise<Buffer> => {
        return await client(`files/${id}/content`, { method: "GET" }, true);
    }
}