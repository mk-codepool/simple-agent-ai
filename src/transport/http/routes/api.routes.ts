import { Application } from 'express';
import { createPingController } from '../controllers/ping.controller';
import { createAgentController } from '../controllers/agent.controller';

export const registerApiRoutes = (app: Application): void => {
	const base: string = '/api/v1';
	app.get(`${base}/ping`, createPingController());
	app.post(`${base}/agent/run`, createAgentController());
};
