import express from 'express';
import path from 'path';
import { cloneWebsite } from './downloader';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/clone', async (req, res) => {
    const { url } = req.body;
    const outputDirectory = path.join(__dirname, '../cloned-website');

    try {
        console.log(`Cloning website: ${url}`);
        await cloneWebsite(url, outputDirectory);
        res.status(200).json({ message: 'Cloning completed successfully!' });
    } catch (error: unknown) {
        console.error('Error during cloning:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: `Error during cloning: ${errorMessage}` });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
