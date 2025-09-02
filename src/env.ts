import { z } from 'zod';

type Env = {
	NODE_ENV: 'development' | 'production' | 'test';
	PORT: number;
	MCP_PLAYWRIGHT_URL: string;
};

const schema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().int().positive().default(3000),
	MCP_PLAYWRIGHT_URL: z.string().url().default('http://localhost:8931/mcp'),
});

export const getEnv = (input: unknown): Env => {
	const parsed = schema.parse(input);
	return { NODE_ENV: parsed.NODE_ENV, PORT: parsed.PORT, MCP_PLAYWRIGHT_URL: parsed.MCP_PLAYWRIGHT_URL };
};


