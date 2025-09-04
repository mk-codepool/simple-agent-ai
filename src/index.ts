import { config } from 'dotenv';
import { ExpressServer } from './express-server/express-server';
import { AgentManager } from './agent-manager/agent-manager';

config();

const port: number = Number(process.env.PORT) || 3000;

const agentManager: AgentManager = new AgentManager();
const expressServer = new ExpressServer(agentManager);

expressServer.start(port);

export {};
