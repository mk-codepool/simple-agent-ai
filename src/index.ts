import { config } from 'dotenv';
import http from 'http';
import { createApp } from './server/app';

config();

const port: number = Number(process.env.PORT) || 3000;
const app = createApp();
const server = http.createServer(app);

server.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`API listening on http://localhost:${port}`);
});

export {};
