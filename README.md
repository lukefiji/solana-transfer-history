# Solana Transfer History

## Getting Started

First, run the development server:

1. `npm install`
2. Duplicate `.env.example` and rename to `.env`
3. Populate `DATABASE_URL`with a MySQL connection URL (e.g. [Planetscale](https://planetscale.com/))
   - For development, use credentials with admin accesss
4. Create an index in [Algolia](https://www.algolia.com/) and populate all `ALGOLIA`-related fields
5. Run `npx prisma db push` to sync Prisma schema with your database
6. `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Engineering Design Document

### Primary Tech

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Algolia](https://www.algolia.com/)

### Secondary Tools

- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Material UI](https://mui.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Given more time

- Spend time on design and styling
- Use constants/enums when defining form field names, and schema keys
