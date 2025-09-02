import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { registerHealthRoutes } from '../transport/http/routes/health.routes';
import { registerApiRoutes } from '../transport/http/routes/api.routes';

export const createApp = (): Application => {
	const app: Application = express();

	app.use(helmet());
	app.use(cors());
	app.use(express.json());

	registerHealthRoutes(app);
	registerApiRoutes(app);

	return app;
};
