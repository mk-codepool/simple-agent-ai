import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	const status: number = (err && (err as any).statusCode) || 500;
	const message: string = (err && (err as any).message) || 'Internal Server Error';
	res.status(status).json({ message });
	next();
};
