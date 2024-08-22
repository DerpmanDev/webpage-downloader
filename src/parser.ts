import * as cheerio from 'cheerio';
import { downloadFile } from './utils';
import { URL } from 'url';

export const parseAndDownloadAssets = async (html: string, baseUrl: string, outputDirectory: string) => {
    const $ = cheerio.load(html);

    // looks for these and downloads them as well
    const assetSelectors = [
        'link[rel="stylesheet"]',
        'script[src]',
        'img[src]',
        'source[src]',            
        'a[href]'
    ];

    const processSelector = async (selector: string) => {
        const assets: string[] = [];
        $(selector).each((index, element) => {
            const assetUrl = $(element).attr('href') || $(element).attr('src');
            if (assetUrl) {
                assets.push(assetUrl);
            }
        });

        await Promise.all(assets.map(async (assetUrl) => {
            try {
                const absoluteUrl = new URL(assetUrl, baseUrl).href;
                await downloadFile(absoluteUrl, outputDirectory);
            } catch (error) {
                console.error(`Error processing asset ${assetUrl}:`, error);
            }
        }));
    };

    await Promise.all(assetSelectors.map(selector => processSelector(selector)));
};
