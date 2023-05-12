import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    ALGOLIA_ADMIN_API_KEY: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_WALLET_ADAPTER_NETWORK: z.nativeEnum(WalletAdapterNetwork),
    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string().min(1),
    NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,
    ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,

    // Client
    NEXT_PUBLIC_WALLET_ADAPTER_NETWORK:
      process.env.NEXT_PUBLIC_WALLET_ADAPTER_NETWORK,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY:
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
  },
});
