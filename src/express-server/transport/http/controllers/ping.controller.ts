import { Request, Response } from 'express';

export type PingResponse = { message: string };

export const pingController = (req: Request, res: Response): void => {
	const response: PingResponse = { message: 'pong' };
	fetch("https://api.sampleapis.com/coffee/hot") 
		.then(resp => resp.json()) 
		.then(data => console.log(data[0].title));
	res.status(200).json(response);
};
