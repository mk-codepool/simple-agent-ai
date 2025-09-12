import { BaseMessage, AIMessage, ToolMessage, UsageMetadata } from '@langchain/core/messages';
import { ToolCall, InvalidToolCall } from '@langchain/core/messages/tool';
import { StreamEvent } from '@langchain/core/tracers/log_stream';

export interface SSEEvent<T = any> {
  event?: 'message' | 'error' | 'end' | 'tool_call' | 'agent_action';
  data: T;
  id?: string;
  retry?: number;
}

export interface LangChainStreamChunk {
  agent?: {
    messages: BaseMessage & { kwargs: MessageKwargs }[];
  };
  tools?: {
    messages: ToolMessage & { kwargs: MessageKwargs }[];
  };
  messages?: BaseMessage & { kwargs: MessageKwargs }[];
}

export interface AgentStreamEvent extends SSEEvent<LangChainStreamChunk> {
  event: 'message' | 'error' | 'end';
}

export interface MessageKwargs {
  content: string;
  additionalKwargs?: {
    toolCalls?: ToolCall[];
  };
  responseMetadata?: Record<string, any>;
  id: string;
  toolCalls?: ToolCall[];
  invalidToolCalls?: InvalidToolCall[];
  usageMetadata?: UsageMetadata;
  status?: string;
  artifact?: any[];
  toolCallId?: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface StreamController {
  writeEvent: <T>(event: SSEEvent<T>) => void;
  writeError: (error: Error) => void;
  writeEnd: () => void;
  close: () => void;
}

export interface ConversationMessage {
  id: string;
  type: 'human' | 'ai' | 'tool';
  content: string;
  timestamp: Date;
  metadata?: {
    toolCalls?: ToolCall[];
    tokens?: UsageMetadata;
    responseTime?: number;
  };
}

export interface ConversationState {
  id: string;
  messages: ConversationMessage[];
  isStreaming: boolean;
  lastUpdated: Date;
  totalTokens?: number;
}

export interface StreamRequestBody {
  input: string;
  conversationId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}