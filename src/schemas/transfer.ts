import { z } from 'zod';

export const getTransfersSchema = z.object({
  publicKey: z.string().trim().min(1),
});

export type GetTransfersSchemaType = z.infer<typeof getTransfersSchema>;

export const createTransferSchema = z.object({
  from: z.string().trim().min(1),
  to: z.string().trim().min(1),
  amount: z.number().gte(0),
  lamports: z.number().gte(0),
  signature: z.string().trim().min(1),
  block: z.number().min(1),
});

export type CreateTransferSchemaType = z.infer<typeof createTransferSchema>;

export type Transfer = CreateTransferSchemaType & {
  objectID: string; // Required by Algolia
  timestamp: number;
  createdAt: Date | string;
};
