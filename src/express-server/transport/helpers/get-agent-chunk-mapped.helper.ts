import { AgentChunkResponse, LangChainStreamChunk, MessageKwargs } from "../../../types/streaming.types";

export function getAgentChunkMapped(
  chunk: LangChainStreamChunk,
  threadId: string,
  messageId: string,
): AgentChunkResponse | null {
  const { agent, tools } = chunk;
  const messages = agent?.messages || tools?.messages;

  if (!messages || messages.length === 0) {
    return null;
  }

  const message = messages[0];
  const kwargs: MessageKwargs = (message as any).kwargs || message;
  const type = agent ? 'agent' : 'tools';
  const timestamp = new Date();

  const response: AgentChunkResponse = {
    id: messageId,
    threadId,
    type,
    content: kwargs.content || '',
    timestamp,
    metadata: {
      toolCalls: kwargs.toolCalls,
      tokens: kwargs.usageMetadata,
    },
  };

  if (type === 'tools' && kwargs.toolCallId) {
    if (response.metadata) {
      response.metadata.toolCallId = kwargs.toolCallId;
      response.metadata.toolName = kwargs.name;
    }
  }

  return response;
}