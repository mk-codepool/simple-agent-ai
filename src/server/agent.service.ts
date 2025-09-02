import { Agent, MCPServerStreamableHttp, run } from '@openai/agents';
import { z } from 'zod';
import { getEnv } from '../../env';

export type AgentRunInput = {
    sessionId: string;
    input: string;
};

const agent: Agent = new Agent({
    name: 'WebUserAgent',
    instructions: 'You are a helpful agent. Maintain context per session.',
});

export const runAgent = async (payload: AgentRunInput): Promise<string> => {
    const schema = z.object({ sessionId: z.string().min(1), input: z.string().min(1) });
    const parsed: AgentRunInput = schema.parse(payload);
    const envRecord: ReturnType<typeof getEnv> = getEnv(process.env);
    const mcpServerStreamableHttp: MCPServerStreamableHttp = new MCPServerStreamableHttp({ url: envRecord.MCP_PLAYWRIGHT_URL });
    await mcpServerStreamableHttp.connect();
    try {
        const agentWithMcp: Agent = agent.clone({ mcpServers: [mcpServerStreamableHttp] });
        const result = await run(agentWithMcp, parsed.input);
        return result.finalOutput ?? '';
    } finally {
        await mcpServerStreamableHttp.close();
    }
};


