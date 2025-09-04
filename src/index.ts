import { config } from 'dotenv';
import { ExpressServer } from './express-server/express-server';
import { AgentManager } from './agent-manager/agent-manager';

config();

const port: number = Number(process.env.PORT) || 3000;

async function main() {
  const agentManager: AgentManager = new AgentManager();
  await agentManager.init();
  const expressServer = new ExpressServer(agentManager);
  
  expressServer.start(port);
}

main();

export {};
