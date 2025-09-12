import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';
import { HumanMessage } from '@langchain/core/messages';

export const createAgentReactStreamController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
  const input: string = req.body.input;
  const threadId: string = req.body.threadId || `thread_${Date.now()}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const userMessage = { messages: [new HumanMessage(input)] };
    const streamConfig = { configurable: { thread_id: threadId, version: 'v2' } };
    const stream = await agentManager.reactAgent.agentExecutor.stream(userMessage, streamConfig);
    
    for await (const chunk of stream) {
      const eventData: string = JSON.stringify(chunk);
      res.write(`data: ${eventData}\n\n`);
    }
    
    res.write('event: end\ndata: {}\n\n');
    res.end();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unknown error';
    res.write(`event: error\ndata: ${JSON.stringify({ error: errorMessage })}\n\n`);
    res.end();
  }
};