import { ReactAgent } from "./agents/reac-agent.agent";
import { ToolsManager } from "./tools/tools-manager.tool";

export class AgentManager {
  public reactAgent!: ReactAgent;
  public toolsManagerTool!: ToolsManager;

  constructor() {
    this.toolsManagerTool = new ToolsManager();
  }
  
  public async init() {
    await this.toolsManagerTool.updateTools();
    this.initAgents();
  }

  public initAgents() {
    this.reactAgent = new ReactAgent({
      tools: this.toolsManagerTool.dynamicStructuredTool,
    });
  }
}