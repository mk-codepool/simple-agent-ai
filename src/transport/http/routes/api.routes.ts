import { Application } from 'express';
import { createPingController } from '../controllers/ping.controller';
import { createAgentController, createMcpServersController, createOpenChromeController } from '../controllers/agent.controller';

export const registerApiRoutes = (app: Application): void => {
	const base: string = '/api/v1';
	app.get(`${base}/ping`, createPingController());
	app.post(`${base}/agent/run`, createAgentController());
	app.get(`${base}/agent/mcp-servers`, createMcpServersController());
	app.post(`${base}/agent/playwright/open`, createOpenChromeController());
};
