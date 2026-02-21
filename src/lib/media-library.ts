import { put, del, list } from "@vercel/blob";

export class MediaLibrary {
    /**
     * Uploads a file to Vercel Blob storage.
     */
    async uploadAsset(file: File | Blob, filename: string) {
        const { url } = await put(filename, file, { access: 'public' });
        return url;
    }

    /**
     * Deletes an asset from Vercel Blob.
     */
    async deleteAsset(url: string) {
        await del(url);
    }

    /**
     * Lists all assets in the project's blob storage.
     */
    async listAssets() {
        return await list();
    }
}

export const mediaLibrary = new MediaLibrary();
