import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';
import { AgentChunkResponse, LangChainStreamChunk } from '../../../../types/streaming.types';
import * as fakeStreamData from './fake-stream.json';
import { getAgentChunkResponse } from '../../helpers/get-agent-chunk-response.helper';

export const createAgentReactFakeStreamController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
  const input: string = req.body.input;
  const threadId: string = req.body.threadId || `thread_${Date.now()}`;
  const messageId: string = `message_${Date.now()}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const fakeChunks: LangChainStreamChunk[] = fakeStreamData as LangChainStreamChunk[];

    let chunkIndex: number = 0;

    const sendChunk = (): void => {
      if (chunkIndex < fakeChunks.length) {
        const chunk: LangChainStreamChunk | undefined = fakeChunks[chunkIndex];
        if (chunk) {
          const agentChunkResponse: AgentChunkResponse = getAgentChunkResponse(chunk, threadId, messageId);
          const eventData: string = JSON.stringify(agentChunkResponse);
          res.write(`data: ${eventData}\n\n`);
          chunkIndex++;
          setTimeout(sendChunk, 1000);
        }
      } else {
        res.write('event: end\ndata: {}\n\n');
        res.end();
      }
    };
    
    setTimeout(sendChunk, 100);

  } catch (error) {
    res.write(`event: error\ndata: ${JSON.stringify({ error })}\n\n`);
    res.end();
  }
};
