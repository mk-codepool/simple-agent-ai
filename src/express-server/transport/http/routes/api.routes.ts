import { Application } from 'express';
import { createPingController } from '../controllers/ping.controller';
import { createAgentManagerController } from '../controllers/agent-manager.controller';
import { AgentManager } from '../../../../agent-manager/agent-manager';

export const registerApiRoutes = (app: Application, agentManager: AgentManager): void => {
	const base: string = '/api/v1';

	app.get(`${base}/ping`, createPingController());
	app.post(`${base}/agents/react`, createAgentManagerController(agentManager));
};
