import { Application } from 'express';
import { createPingController } from '../controllers/ping.controller';

export const registerApiRoutes = (app: Application): void => {
	const base: string = '/api/v1';
	app.get(`${base}/ping`, createPingController());
};
