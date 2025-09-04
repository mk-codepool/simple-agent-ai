import { Tool } from "@langchain/core/tools";
import { Runnable } from "@langchain/core/runnables";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";

export class ReactAgent {
  public agent;
  public tools: Tool[] = [];
  public llm!: Runnable;
  public memorySaver!: MemorySaver;

  constructor() {
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
}