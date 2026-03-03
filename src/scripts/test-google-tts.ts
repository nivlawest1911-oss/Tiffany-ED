import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testTTS() {
    try {
        const client = new TextToSpeechClient({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            projectId: process.env.GOOGLE_PROJECT_ID,
        });

        console.log('--- TEST START ---');
        const [response] = await client.synthesizeSpeech({
            input: { text: 'Test' },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        });
        console.log('--- SUCCESS ---');
    } catch (err: any) {
        console.log('--- ERROR START ---');
        console.log('Message:', err.message);
        if (err.details) console.log('Details:', err.details);
        // Look for the enablement link in the error object if present
        console.log('--- ERROR END ---');
    }
}

testTTS();
