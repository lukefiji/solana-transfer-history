import { isValidAddress } from '@/utils';
import { z } from 'zod';

export const sendSOLFormSchema = z.object({
  recipientAddress: z
    .string()
    .min(1, { message: 'Required' })
    .refine((address) => isValidAddress(address), {
      message: 'Invalid wallet address',
    }),
  amount: z.number().gt(0, { message: 'Must be greater than 0' }),
});

export type SendSOLFormSchemaInput = z.infer<typeof sendSOLFormSchema>;
