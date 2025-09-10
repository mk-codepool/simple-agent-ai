import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';
import { HumanMessage } from '@langchain/core/messages';

export const createAgentReactStreamController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
  const input: string = req.body.input;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const userMessage = { messages: [new HumanMessage(input)] };
    const stream = await agentManager.reactAgent.agent.stream(userMessage, { configurable: { thread_id: '1' } });
    for await (const chunk of stream) {
      const eventData = JSON.stringify(chunk);
      res.write(`data: ${eventData}\n\n`);
    }
    res.write('event: end\ndata: {}\n\n');
    res.end();
  } catch (error) {
    res.write(`event: error\ndata: ${JSON.stringify({ error })}\n\n`);
    res.end();
  }
};