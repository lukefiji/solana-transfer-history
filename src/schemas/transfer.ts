import { z } from 'zod';

export const createTransferSchema = z.object({
  from: z.string().trim().min(1),
  to: z.string().trim().min(1),
  amount: z.number().gte(0),
  lamports: z.number().gte(0),
  signature: z.string().trim().min(1),
  block: z.string().trim().min(1),
});

export type CreateTransferSchemaType = z.infer<typeof createTransferSchema>;

export type Transfer = CreateTransferSchemaType & {
  objectID: string; // Required by Algolia
  timestamp: number;
  createdAt: string;
};
