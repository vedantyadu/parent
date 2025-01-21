
import express from 'express';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import z from "zod"

const t = initTRPC.create()
const router = t.router
const procedure = t.procedure

export const appRouter = router({
  getUsername: procedure.input(z.object({name: z.string()})).query(({input}) => {
    return {message: `Hello ${input.name}`}
  }),
})

export type AppRouter = typeof appRouter

const app = express();
const PORT = 4000

app.use(cors())
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext: ({req, res}) => ({req, res}) }))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
