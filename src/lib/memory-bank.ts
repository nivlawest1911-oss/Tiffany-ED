import { put } from '@vercel/blob';

/**
 * Memory Bank: Permanent Storage for the Sovereign Teaching Temple.
 * Ensures that even if APIs or AI scripts go down, the library of 
 * professional teaching media remains owned and accessible by EdIntel.
 */

export async function depositToMemoryBank(url: string, filename: string) {
    try {
        // Fetch the media from the transient URL
        const response = await fetch(url);
        const blob = await response.blob();

        // Deposit into the permanent Vault (Vercel Blob)
        const { url: vaultUrl } = await put(filename, blob, {
            access: 'public',
        });

        console.log(`[Memory Bank] Deposited: ${filename} -> ${vaultUrl}`);
        return vaultUrl;
    } catch (error) {
        console.error('[Memory Bank] Deposit Failed:', error);
        return url; // Fallback to original
    }
}

export async function storeProfessorScript(script: string, professorId: string) {
    // Store script in permanent DB (Postgres handled elsewhere, but this is for text-blobs)
    const { url } = await put(`scripts/${professorId}-${Date.now()}.txt`, script, {
        access: 'public',
    });
    return url;
}
