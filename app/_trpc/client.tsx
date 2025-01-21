import { AppRouter } from '@server/index'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
})
