import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';

interface FakeChunk {
  messages?: Array<{
    id?: string;
    type?: string;
    content?: string;
  }>;
  agent?: {
    messages?: Array<{
      id?: string;
      type?: string;
      content?: string;
    }>;
  };
}

export const createAgentReactFakeStreamController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
  const input: string = req.body.input;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const fakeChunks: FakeChunk[] = [
      {
        agent: {
          messages: [{
            id: 'msg_1',
            type: 'ai',
            content: 'I understand your request about: '
          }]
        }
      },
      {
        agent: {
          messages: [{
            id: 'msg_2', 
            type: 'ai',
            content: `"${input}"`
          }]
        }
      },
      {
        agent: {
          messages: [{
            id: 'msg_3',
            type: 'ai', 
            content: '. Let me process this for you...'
          }]
        }
      },
      {
        agent: {
          messages: [{
            id: 'msg_4',
            type: 'ai',
            content: ' Here is my response to your query.'
          }]
        }
      },
      {
        agent: {
          messages: [{
            id: 'msg_5',
            type: 'ai',
            content: ' This is a simulated streaming response using setTimeout instead of the actual agent stream.'
          }]
        }
      }
    ];

    let chunkIndex: number = 0;

    const sendChunk = (): void => {
      if (chunkIndex < fakeChunks.length) {
        const chunk: FakeChunk | undefined = fakeChunks[chunkIndex];
        if (chunk) {
          const eventData: string = JSON.stringify(chunk);
          res.write(`data: ${eventData}\n\n`);
          chunkIndex++;
          setTimeout(sendChunk, 200); // 200ms delay between chunks
        }
      } else {
        res.write('event: end\ndata: {}\n\n');
        res.end();
      }
    };

    // Start sending chunks after initial delay
    setTimeout(sendChunk, 100);

  } catch (error) {
    res.write(`event: error\ndata: ${JSON.stringify({ error })}\n\n`);
    res.end();
  }
};
