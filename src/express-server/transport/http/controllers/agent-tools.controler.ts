import { Request, Response } from 'express';
import { AgentManager } from '../../../../agent-manager/agent-manager';

export interface AgentToolsResponse {
  groupName: string;
  toolNames: string[];
};

export const createAgentToolsController = (agentManager: AgentManager) => async (req: Request, res: Response): Promise<void> => {
  try {
    const tools = agentManager.toolsManagerTool.dynamicStructuredTool;
    const availableTools: AgentToolsResponse[] = [{
      groupName: 'playwright',
      toolNames: tools.map(tool => tool.name),
    }];

    res.status(200).json(availableTools);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
