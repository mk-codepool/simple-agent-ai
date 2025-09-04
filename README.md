# AI Web User - Backend API

TypeScript Express REST API with hot reload.

## Scripts

- `npm run dev`: Start dev server with hot reload
- `npm run build`: Build to `dist`
- `npm start`: Run compiled server
- `npm run lint` / `npm run lint:fix`: Lint code
- `npm run typecheck`: TypeScript check

## Setup

1. Install dependencies
2. Create a `.env` file:

```
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
```

3. Start dev server:

```
npm run dev
```

## API

- `GET /health` → `{ status: "ok" }`
- `GET /api/v1/ping` → `{ message: "pong" }`
