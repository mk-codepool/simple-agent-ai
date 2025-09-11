import { Application } from 'express';
import { pingController } from '../controllers/ping.controller';
import { createAgentReactStreamController } from '../controllers/agent-react-stream.controller';
import { createAgentToolsController } from '../controllers/agent-tools.controler';
import { createAgentReactFakeStreamController } from '../controllers/fake-stream.controller';
import { AgentManager } from '../../../../agent-manager/agent-manager';

export const registerApiRoutes = (app: Application, agentManager: AgentManager): void => {
	const base: string = '/api/v1';

	app.get(`${base}/ping`, pingController);
	app.post(`${base}/agent-manager/stream`, createAgentReactStreamController(agentManager));
	app.post(`${base}/agent-manager/fake-stream`, createAgentReactFakeStreamController(agentManager));
	app.get(`${base}/agent-manager/tools`, createAgentToolsController(agentManager));
};
