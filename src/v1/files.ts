import { createReadStream } from "fs";
import { ApiClient } from "..";
import FormData from "form-data";

type File = {
    id: string;
    object: string;
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
    data: File[];
    object: string;
};

export function listFiles(client: ApiClient) {
    return async (): Promise<FileList> => {
        return await client("files", { method: "GET" });
    }
}

export function uploadFile(client: ApiClient) {
    return async (file: string, purpose: string): Promise<File> => {
        const data = new FormData();

        data.append('purpose', purpose);
        data.append('file', createReadStream(file));

        return await client("files", { method: "POST", data });
    }
}

export function deleteFile(client: ApiClient) {
    return async (id: string): Promise<DeletedFile> => {
        return await client(`files/${id}`, { method: "DELETE" });
    }
}

export function retrieveFile(client: ApiClient) {
    return async (id: string): Promise<File> => {
        return await client(`files/${id}`, { method: "GET" });
    }
}

export function retrieveFileContent(client: ApiClient) {
    return async (id: string): Promise<Buffer> => {
        return await client(`files/${id}/content`, { method: "GET" }, true);
    }
}