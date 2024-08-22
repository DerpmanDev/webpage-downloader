"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndDownloadAssets = void 0;
const cheerio = __importStar(require("cheerio"));
const utils_1 = require("./utils");
const url_1 = require("url");
const parseAndDownloadAssets = async (html, baseUrl, outputDirectory) => {
    const $ = cheerio.load(html);
    // looks for these and downloads them as well
    const assetSelectors = [
        'link[rel="stylesheet"]',
        'script[src]',
        'img[src]',
        'source[src]',
        'a[href]'
    ];
    const processSelector = async (selector) => {
        const assets = [];
        $(selector).each((index, element) => {
            const assetUrl = $(element).attr('href') || $(element).attr('src');
            if (assetUrl) {
                assets.push(assetUrl);
            }
        });
        await Promise.all(assets.map(async (assetUrl) => {
            try {
                const absoluteUrl = new url_1.URL(assetUrl, baseUrl).href;
                await (0, utils_1.downloadFile)(absoluteUrl, outputDirectory);
            }
            catch (error) {
                console.error(`Error processing asset ${assetUrl}:`, error);
            }
        }));
    };
    await Promise.all(assetSelectors.map(selector => processSelector(selector)));
};
exports.parseAndDownloadAssets = parseAndDownloadAssets;
