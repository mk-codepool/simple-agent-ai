import { Request, Response } from 'express';
import { z } from 'zod';
import { listAvailableMcpServers, openChromeUiSession, runAgent } from '../../../server/agent.service';

type RequestBody = {
    sessionId: string;
    input: string;
};

export const createAgentController = () => async (req: Request, res: Response): Promise<void> => {
    const schema = z.object({ sessionId: z.string().min(1), input: z.string().min(1) });
    const body: RequestBody = req.body as RequestBody;
    const parsed = schema.safeParse(body);
    console.log(parsed);
    if (!parsed.success) {
        res.status(400).json({ error: 'Invalid body' });
        return;
    }
    const output = await runAgent(parsed.data);
    res.json({ output });
};


export const createMcpServersController = () => async (_req: Request, res: Response): Promise<void> => {
    const servers = listAvailableMcpServers();
    res.json({ servers });
};

type OpenChromeBody = {
    sessionId: string;
};

export const createOpenChromeController = () => async (req: Request, res: Response): Promise<void> => {
    const schema = z.object({ sessionId: z.string().min(1) });
    const body: OpenChromeBody = req.body as OpenChromeBody;
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        res.status(400).json({ error: 'Invalid body' });
        return;
    }
    const output = await openChromeUiSession(parsed.data);
    res.json({ output });
};
