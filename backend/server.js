const express = require("express");
const { promises: fs } = require("fs");
const { spawn } = require("child_process");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

async function CreateFile(brute, optimal, generative, dir) {
    try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(path.join(dir, 'GenerateCases.cpp'), generative.trim());
        await fs.writeFile(path.join(dir, 'brute.cpp'), brute.trim());
        await fs.writeFile(path.join(dir, 'optimal.cpp'), optimal.trim());
    } catch (err) {
        console.error(`Can't create file:`, err);
        throw err;
    }
}

async function DeleteFile(dir) {
    try {
        await fs.rm(dir, { recursive: true, force: true });
    } catch (err) {
        console.error("Failed to delete file:", err);
    }
}

app.post('/run-code', async function(req, res) {
    const { brute, optimal, generative } = req.body;

    if (!brute || !optimal || !generative) {
        const arr = [];
        if (!brute) arr.push("brute");
        if (!optimal) arr.push("optimal");
        if (!generative) arr.push("generative");
        return res.status(400).json({ msg: `Please write the logic for: ${arr.join(', ')}` });
    }

    const tempDirName = `tempfile-${uuidv4()}`;
    const tempDirPath = path.join(__dirname, tempDirName);

    try {
        await CreateFile(brute, optimal, generative, tempDirPath);
        console.log("File Created", tempDirName);

        const dockerRun = `sudo docker run --rm -v "${tempDirPath}":/app/tests --workdir /app --network none --memory=512m --cpus="1.0" stress2 ./mn_load.sh`;

        const child = spawn(dockerRun, {
            shell: true,
            timeout: 10000
        });

        let output = "";

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            output += data.toString();
        });

        child.on('close', async (code) => {
            await DeleteFile(tempDirPath);
            res.status(200).json({ output });
        });

        child.on('error', async (err) => {
            await DeleteFile(tempDirPath);
            res.status(500).json({ error: 'Failed to process request.' });
        });

    } catch (err) {
        await DeleteFile(tempDirPath);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

app.listen(80, () => {
    console.log(`Server listening on port 80`);
});