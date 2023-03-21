import { ApiClient } from "..";
import { readFile } from "../request";

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
    return async (file: string | Blob, purpose: string): Promise<FileObject> => {
        const form: Record<string, any> = {
            'purpose': purpose,
            'file': readFile(file)
        };

        return await client("files", { method: "POST", form });
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