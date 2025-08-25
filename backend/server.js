const express = require("express");
const { promises: fs } = require("fs");
const app = express();
const { exec } = require("child_process");
const path = require("path");
const os = require("os"); 
const { v4: uuidv4 } = require('uuid');
const cors  = require("cors")
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
        console.log("file Created", tempDirName);
        
        const dockerRun = `sudo docker run --rm -v "${tempDirPath}":/app/tests --workdir /app --network none --memory=512m --cpus="1.0" stress2 ./mn_load.sh`;
            const execOptions = {
                timeout: 10000,
                maxBuffer: 1024 * 1024 * 10, 
            };


        await exec(dockerRun, execOptions, async (error, stdout, stderr) => {
            await DeleteFile(tempDirPath);

            if (stderr) {
                console.error("--- Detailed Script Execution Error ---");
                console.error("Error Object:", error);
                console.error("Stdout:", stdout);
                console.error("Stderr:", stderr);
                console.error("--- End of Error ---");
                const errorMessage = stderr || error.message;
                return res.status(500).json({ error: `Execution failed: ${stderr}` });
            }
            res.status(200).json({ output: stdout });
        });

    } catch (err) {
        console.error('Processing error:', err);
        await DeleteFile(tempDirPath);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

app.listen(80, () => {
    console.log(`Server listening on port 80`);
});
