import { Application } from 'express';
import { pingController } from '../controllers/ping.controller';
import { createAgentManagerController } from '../controllers/agent-manager.controller';
import { createAgentReactStreamController } from '../controllers/agent-react-stream.controller';
import { createAgentToolsController } from '../controllers/agent-tools.controler';
import { AgentManager } from '../../../../agent-manager/agent-manager';

export const registerApiRoutes = (app: Application, agentManager: AgentManager): void => {
	const base: string = '/api/v1';

	app.get(`${base}/ping`, pingController);
	app.post(`${base}/agent-manager/react`, createAgentManagerController(agentManager));
	app.post(`${base}/agent-manager/react/stream`, createAgentReactStreamController(agentManager));
	app.get(`${base}/agent-manager/tools`, createAgentToolsController(agentManager));
};
