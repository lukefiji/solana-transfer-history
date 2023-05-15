# Design Document

## Stack

### Primary Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Prisma](https://www.prisma.io/)
- [Planetscale](https://planetscale.com/)

### Supplemental Technologies

- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Algolia](https://www.algolia.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Description

The project leverages Next.js at its core as an opinionated way to create a full-stack, server-side rendered React application. I feel that it is a safe choice for a new project due to the huge community surrounding the React/Next.js ecosystem - a lot of problems you may typically face most likely have already been solved.

TypeScript is used because it eliminates a whole class of errors through static type checking. Although this comes with a tradeoff of impacting development speed, TypeScript helps with scalability as the project size grows to the point where it becomes difficult to maintain its mental modal as a whole.

Solana Wallet Adapter was used for client-side wallet authentication, and to interact with the Solana blockchain - in this app's case, to sign a transaction which would transfer SOL from the signer's wallet to a specified destination.
Algolia is used as an autocomplete tool when searching through a user's past transactions.

Prisma ORM was used to abstract away the complexity of maintaining a database and writing/running raw SQL queries. It provides straightforward integrations with managed database services such as Planetscale, which I chose to use for this project. It also provides generated TypeScript types based on your schema to be used throughout your application.

For state management, I chose to use TanStack Query as its strength lies with "fetching, caching, synchronizing and updating server state". It serves as a great fit because most of this application's state exists on the server (and the blockchain). Its hooks provide transitional states such as `isLoading` or `isError` which we can visually represent in the application. I felt that there wasn't enough client-side interaction needed to warrant the overhead and complexity that lies with using something like Redux.

Material UI was used as a component library to speed up the creation of UI layout by providing a standardized set pre-styled components. Additionally, Solana Wallet Adapter provided pre-styled Material UI components (`@solana/wallet-adapter-material-ui`) so I felt that it would save some time by leveraging these pre-made components.

React Hook Form is used to optimize and standardize managing form state. It comes with a powerful set of features to handle forms of any size and complexity. In terms of form validation, it provides integrations with schema validation libraries such as Zod.

Zod is a schema declaration and validation library. In this application, it's used for validation in React Hook Form and on the server. Since is built around TypeScript, when you define a schema, it automatically infers the static TypeScript type, which then can be consumed throughout your application.

ESLint & Prettier are used to ensure consistent code standards throughout a codebase. I've decided to install `prettier-plugin-organize-imports` to auto-organize imported modules, and ``@tanstack/eslint-plugin-query` to enforce good practices while using TanStack Query.

## Given more time, I would

- [*"Write tests. Not too many. Mostly integration."*](https://twitter.com/rauchg/status/807626710350839808)
- Put more love into the UI's design and styling, I appreciate good design and I regretfully admit that it isn't up to my standards
  - Retrospectively, I would have preferred to work with Tailwind CSS + Headless UI to move fast
- Figure out a way to ensure consistency between the database and the Algolia index
- Authenticate user wallet with the backend using [NextAuth](https://next-auth.js.org/) + [`solana-next-auth`](https://github.com/BlockSmith-Labs/solana-next-auth)
  - Primarily, to secure the `/api/transfers` route for authenticated users only
  - Also, to handle transaction signing on the backend
- Spend more time in Solana Wallet Adapter's documentation
- Use constants/enums when defining form field names, TanStack Query keys, and in other places where applicable - for scalability
- Clean up folder/file structure. This can also be an iterative process as a project grows
