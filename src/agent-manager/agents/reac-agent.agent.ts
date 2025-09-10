import { DynamicStructuredTool, Tool } from "@langchain/core/tools";
import { Runnable } from "@langchain/core/runnables";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";

export class ReactAgent {
  public agent;
  public tools: DynamicStructuredTool[] = [];
  public llm!: Runnable;
  public memorySaver!: MemorySaver;

  constructor(
    { tools }: { tools: DynamicStructuredTool[] }
  ) {
    this.tools = tools;
    this.memorySaver = new MemorySaver();
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4o-mini',
    });

    this.agent = createReactAgent({
      llm: this.llm,
      tools: this.tools,
      checkpointSaver: this.memorySaver,
    });
  }

  public invoke(input: string): Promise<any> {
    const userMessage = { messages: new HumanMessage(input) }
    const configurable = { configurable: { thread_id: '1' } }
    return this.agent.invoke(userMessage, configurable).catch((error) => {
      console.log('error');
      console.log(error);
      return error;
    });
  }

  public async *stream(input: string): AsyncGenerator<any> {
    const userMessage = { messages: new HumanMessage(input) }
    const configurable = { configurable: { thread_id: '1' } }
    try {
      const stream = await this.agent.stream(userMessage, configurable);
      let chunkCount = 0;
      for await (const chunk of stream) {
        chunkCount++;
        console.log(`Streaming chunk ${chunkCount}:`, chunk);
        yield chunk;
      }
      console.log(`Total chunks streamed: ${chunkCount}`);
    } catch (error) {
      console.log('streaming error');
      console.log(error);
      yield { messages: [new HumanMessage('Error occurred during streaming')] };
    }
  }
}