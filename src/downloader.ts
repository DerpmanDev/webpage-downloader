import axios from 'axios';
import * as fs from 'fs-extra';
import * as path from 'path';
import { parseAndDownloadAssets } from './parser';

export const cloneWebsite = async (url: string, outputDirectory: string) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        
        await fs.ensureDir(outputDirectory);

        // main html page
        const mainPagePath = path.join(outputDirectory, 'index.html');
        await fs.outputFile(mainPagePath, html);

        // PArse HTML and download assets
        await parseAndDownloadAssets(html, url, outputDirectory);
        
        console.log('Website cloned successfully.');
    } catch (error: unknown) {
        console.error('Error during cloning:', error);
    }
};
