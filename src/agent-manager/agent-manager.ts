import { ReactAgent } from "./agents/reac-agent.agent";
import { ToolsManager } from "./tools/tools-manager.tool";
import { AppUserStateGraph, StateAnnotation } from "./state-graphs/app-user.state-graph";
import { END, START } from "@langchain/langgraph";

export class AgentManager {
  public reactAgent!: ReactAgent;
  public toolsManagerTool!: ToolsManager;
  public appUserStateGraph!: AppUserStateGraph;

  constructor() {
    this.toolsManagerTool = new ToolsManager();
  }
  
  public async init() {
    await this.toolsManagerTool.updateTools();
    this.initAgents();
    this.initAppUserStateGraph();
  }

  public initAgents() {
    this.reactAgent = new ReactAgent({
      tools: this.toolsManagerTool.dynamicStructuredTool,
    });
  }

  private initAppUserStateGraph() {
    this.appUserStateGraph = new AppUserStateGraph();

    this.appUserStateGraph
      .stateGraph
      .addNode('reactAgent', async (state: any) => this.reactAgentNode(state))
      .addEdge(START, 'reactAgent')
      .addEdge('reactAgent', END);
    this.appUserStateGraph.compiledGraph = this.appUserStateGraph.stateGraph.compile();
  }

  private async reactAgentNode(state: typeof StateAnnotation.State) {
    console.log('[AGENT THINKING] Processing user input...');
    console.log('[AGENT THINKING] Current state:', {
      sentiment: state.sentiment,
      messageCount: state.messages.length
    });

    const lastMessage = state.messages[state.messages.length - 1];
    if (!lastMessage) {
      console.log('[AGENT THINKING] No messages found in state');
      return state;
    }

    const userInput = typeof lastMessage.content === 'string'
      ? lastMessage.content
      : Array.isArray(lastMessage.content)
        ? lastMessage.content.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join(' ')
        : JSON.stringify(lastMessage.content);

    console.log('[AGENT THINKING] Extracted user message:', userInput);
    console.log('[AGENT THINKING] Invoking agent with tools...');

    try {
      const result = await this.reactAgent.invoke(userInput);
      console.log('[AGENT THINKING] Agent invocation completed successfully');
      console.log('[AGENT THINKING] Agent response structure:', Object.keys(result));

      if (result.messages && result.messages.length > 0) {
        const newMessages = result.messages.slice(state.messages.length);
        console.log('[AGENT THINKING] New messages added:', newMessages.length);

        return {
          ...state,
          messages: [...state.messages, ...newMessages]
        };
      }

      console.log('[AGENT THINKING] No new messages in agent response');
      return state;

    } catch (error) {
      console.error('[AGENT THINKING] Error during agent invocation:', error);
      console.log('[AGENT THINKING] Returning original state due to error');
      return state;
    }
  }
}