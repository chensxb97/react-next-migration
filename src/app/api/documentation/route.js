import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
    try {
        const filePath = path.join(process.cwd(), 'src', 'app', 'doc', 'example.md');
        const data = await fs.readFile(filePath, 'utf8');

        return new Response(JSON.stringify({ content: data }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Failed to process request' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}