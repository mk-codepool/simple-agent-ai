import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';
import { HumanMessage } from '@langchain/core/messages';
import { AgentChunkResponse } from '../../../../types/streaming.types';
import { getAgentChunkResponse } from '../../helpers/get-agent-chunk-response.helper';
import { getAgentChunkMapped } from '../../helpers/get-agent-chunk-mapped.helper';

export const createAgentReactStreamController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
  const input: string = req.body.input;
  const threadId: string = req.body.threadId || `thread_${Date.now()}`;
  const messageId: string = `message_${Date.now()}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const userMessage = { messages: [new HumanMessage(input)] };
    const streamConfig = {
      configurable: {
        thread_id: threadId,
        version: 'v2'
      }
    };
    const stream = await agentManager.reactAgent.agent.stream(userMessage, streamConfig);
    
    for await (const chunk of stream) {
      const agentChunkResponse = getAgentChunkMapped(chunk, threadId, messageId);
      if (agentChunkResponse) {
        const eventData: string = JSON.stringify(agentChunkResponse);
        res.write(`data: ${eventData}\n\n`);
      }
    }
    
    res.write('event: end\ndata: {}\n\n');
    res.end();
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unknown error';
    res.write(`event: error\ndata: ${JSON.stringify({ error: errorMessage })}\n\n`);
    res.end();
  }
};