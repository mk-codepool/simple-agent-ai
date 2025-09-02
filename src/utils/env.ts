import { z } from 'zod';

type Env = {
	NODE_ENV: 'development' | 'production' | 'test';
	PORT: number;
};

const schema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.coerce.number().int().positive().default(3000),
});

export const getEnv = (input: unknown): Env => {
	const parsed = schema.parse(input);
	return { NODE_ENV: parsed.NODE_ENV, PORT: parsed.PORT };
};
