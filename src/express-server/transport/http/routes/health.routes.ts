import { Application, Request, Response } from 'express';

const createHealthHandler = () => (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok' });
};

export const registerHealthRoutes = (app: Application): void => {
	app.get('/health', createHealthHandler());
};
