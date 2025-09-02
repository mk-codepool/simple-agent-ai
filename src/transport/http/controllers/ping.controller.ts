import { Request, Response } from 'express';

export type PingResponse = { message: string };

const handlePing = (req: Request, res: Response): void => {
	const response: PingResponse = { message: 'pong' };
	res.status(200).json(response);
};

export const createPingController = () => (req: Request, res: Response) => handlePing(req, res);
