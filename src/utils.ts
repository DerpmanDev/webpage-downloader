import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';

export const downloadFile = async (url: string, basePath: string) => {
    try {
        const urlPath = new URL(url).pathname;
        const outputPath = path.join(basePath, urlPath);
        await fs.ensureDir(path.dirname(outputPath));
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        await fs.outputFile(outputPath, response.data);
        console.log(`Downloaded ${url} to ${outputPath}`);
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.warn(`Resource not found at ${url}, skipping.`);
        } else {
            console.error(`Failed to download ${url}:`, error);
            throw error;
        }
    }
};
