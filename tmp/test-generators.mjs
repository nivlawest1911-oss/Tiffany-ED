import http from 'http';

const generators = [
    { id: "iep-specialist", prompt: "Write a SMART goal for reading fluency." },
    { id: "lesson-planner", prompt: "Create a 5E lesson plan for photosynthesis." },
    { id: "data-analyst", prompt: "Analyze this assessment data: 40% proficiency." },
    { id: "policy-advisor", prompt: "Explain FERPA directory information." },
    { id: "cognitive-coach", prompt: "Give me ADHD focus strategies." },
    { id: "idea-generator", prompt: "Give me an engagement hook for the Civil War." }
];

async function testGenerator(gen) {
    console.log(`\n\n--- Testing ${gen.id} ---`);
    return new Promise((resolve) => {
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/generate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            res.setEncoding('utf8');
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`RESPONSE (first 150 chars): \n${data.substring(0, 150)}...`);
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            resolve();
        });

        // Write data to request body
        req.write(JSON.stringify({
            prompt: gen.prompt,
            generatorId: gen.id,
            systemInstruction: "You are an AI."
        }));
        req.end();
    });
}

async function run() {
    for (const gen of generators) {
        await testGenerator(gen);
    }
}

run();
