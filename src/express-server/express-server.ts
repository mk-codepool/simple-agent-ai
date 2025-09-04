import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { registerHealthRoutes } from './transport/http/routes/health.routes';
import { registerApiRoutes } from './transport/http/routes/api.routes';
import { errorMiddleware } from './transport/http/middlewares/error.middleware';
import { AgentManager } from '../agent-manager/agent-manager';

export class ExpressServer {
	public app: Application;
	private server: http.Server;
	private agentManager: AgentManager;

	constructor(agentManager: AgentManager) {
		this.agentManager = agentManager;
		this.app = express();
		this.server = http.createServer(this.app);
		this.initializeMiddlewares();
		this.initializeRoutes();
	}

	public start(port: number): void {
		this.server.listen(port, () => {
			// eslint-disable-next-line no-console
			console.log(`🚀 \x1b[32mAPI listening on http://localhost:${port}\x1b[0m`);
		});
	}

	private initializeMiddlewares(): void {
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(express.json());
	}

	private initializeRoutes(): void {
		registerHealthRoutes(this.app);
		registerApiRoutes(this.app, this.agentManager);
		this.app.use(errorMiddleware);
	}
}
