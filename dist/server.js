"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const downloader_1 = require("./downloader");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, './')));
app.post('/clone', async (req, res) => {
    const { url } = req.body;
    const outputDirectory = path_1.default.join(__dirname, '../cloned-website');
    try {
        console.log(`Cloning website: ${url}`);
        await (0, downloader_1.cloneWebsite)(url, outputDirectory);
        res.status(200).json({ message: 'Cloning completed successfully!' });
    }
    catch (error) {
        console.error('Error during cloning:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: `Error during cloning: ${errorMessage}` });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
