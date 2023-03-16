import { fileFrom } from 'node-fetch';

export default async (file: string | File) => {
    return typeof file === 'string' ? await fileFrom(file) : file;
}