const express = require("express");
const { promises: fs } = require("fs");
const app = express();
const { exec } = require("child_process");
const path = require("path");
const os = require("os"); 
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        
        // Corrected the docker run command to use the local temp path
        const dockerRun = `sudo docker run --rm -v "${tempDirPath}":/app/tests --workdir /app --network none --memory=512m --cpus="1.0" stress-me ./mn_load.sh`;

        await exec(dockerRun, { timeout: 10000 }, async (error, stdout, stderr) => {
            // Cleanup happens here, after the exec command completes
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
        // Also cleanup on a file creation error
        await DeleteFile(tempDirPath);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

app.listen(9696, () => {
    console.log(`Server listening on port 9696`);
});
