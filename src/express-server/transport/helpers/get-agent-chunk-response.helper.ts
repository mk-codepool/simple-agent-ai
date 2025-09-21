import { AgentChunkResponse, LangChainStreamChunk, MessageKwargs } from "../../../types/streaming.types";

export function getAgentChunkResponse(chunk: LangChainStreamChunk, threadId: string, messageId: string): AgentChunkResponse {
  console.log(chunk)
  const { agent, tools } = chunk;
  const messages = agent?.messages || tools?.messages || [];
  const message = messages[0];
  const kwargs = message?.kwargs as MessageKwargs;
  const timestamp = new Date();
  const type = agent ? 'agent' : 'tools';
  
  return {
    id: messageId,
    type,
    content: kwargs?.content,
    timestamp,
    metadata: kwargs?.metadata,
    threadId,
  };
}