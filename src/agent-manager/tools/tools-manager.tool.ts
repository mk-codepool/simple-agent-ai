import { DynamicStructuredTool, Tool } from '@langchain/core/tools';
import { ClientConfig, MultiServerMCPClient } from '@langchain/mcp-adapters';

export class ToolsManager {
  public dynamicStructuredTool: DynamicStructuredTool[] = [];
  public multiServerMCPClient: MultiServerMCPClient;
  
  private clientConfig: ClientConfig = {
    mcpServers: {
      playwright: {
        url: "http://localhost:8931/mcp"
      }
    }
  }

  constructor() {
    this.multiServerMCPClient = new MultiServerMCPClient(this.clientConfig);
  }

  public async updateTools() {
    this.dynamicStructuredTool = await this.multiServerMCPClient.getTools();
  }
}