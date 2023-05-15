# Solana Transfer History

[**Engineering Design Document**](DESIGN.md)

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
