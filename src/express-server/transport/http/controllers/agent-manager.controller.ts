import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';

export type AgentManagerResponse = { message: string };

export const createAgentManagerController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
	const { input } = req.body;
	try {
		const result = await agentManager.reactAgent.invoke(input);
		const totalMessages = result.messages.length;
		const resultMessage = result.messages[totalMessages - 1].content;
		res.status(200).json({ message: resultMessage });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
