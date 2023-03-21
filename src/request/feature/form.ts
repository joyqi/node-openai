import { ClientRequest } from "http";
import { Feature, Options, Init, StreamFile, FetchOptions } from "..";
import { ReadStream } from "fs";

declare module ".." {
    interface Init {
        form?: Form;
    }
}

type Form = {
    [key: string]: string | StreamFile;
};

async function uploadFile(file: StreamFile, client: ClientRequest): Promise<void> {
    return new Promise((resolve, reject) => {
        const stream = file.stream as ReadStream;

        stream.on("error", reject);
        stream.on("end", () => {
            client.write("\r\n");
            resolve();
        });
        stream.pipe(client, { end: false });
    });
}

export class FormFeature implements Feature {
    forRequest(init: Init, options: Options) {}

    async forRequestClient(init: Init, client: ClientRequest) {
        if (init.form) {
            const boundary = "--------------------------" + Date.now().toString(16);
            client.setHeader("Content-Type", `multipart/form-data; boundary=${boundary}`);

            for (const key in init.form) {
                const value = init.form[key];
                client.write(`--${boundary}\r\n`);
                client.write(`Content-Disposition: form-data; name="${key}"`);

                if (typeof value === "string") {
                    client.write(`\r\n\r\n${value}\r\n`);
                } else {
                    client.write(`; filename="${value.name}"\r\n`);
                    client.write(`Content-Type: application/octet-stream\r\n\r\n`);
                    await uploadFile(value, client);
                }
            }

            client.write(`--${boundary}--\r\n`);
        }
    }

    forFetch(init: Init, options: FetchOptions) {
        if (init.form) {
            options.headers = {
                ...options.headers,
                "Content-Type": "multipart/form-data",
            };

            const formData = new FormData();

            for (const key in init.form) {
                const value = init.form[key];

                if (typeof value === "string") {
                    formData.append(key, value);
                } else {
                    formData.append(key, value.stream as Blob, value.name);
                }
            }

            options.body = formData;
        }
    }
}