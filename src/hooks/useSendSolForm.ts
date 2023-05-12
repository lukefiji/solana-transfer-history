import {
  useTransferHistoryQuery,
  useTransferSolMutation,
  useWalletBalanceQuery,
  useZodForm,
} from '@/hooks';
import {
  SendSOLFormSchemaInput,
  sendSOLFormSchema,
} from '@/schemas/sendSOLForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

type UseSendSolFormReturn = {
  formMethods: UseFormReturn<SendSOLFormSchemaInput>;
  onSubmit: SubmitHandler<SendSOLFormSchemaInput>;
};

function useSendSolForm(): UseSendSolFormReturn {
  const { publicKey } = useWallet();
  const { data: walletBalanceData, refetch: refetchWalletBalance } =
    useWalletBalanceQuery();
  const { refetch: refetchTransferHistory } = useTransferHistoryQuery();
  const { mutate } = useTransferSolMutation();

  const formMethods = useZodForm({
    schema: sendSOLFormSchema,
    defaultValues: {
      recipientAddress: '',
    },
  });
  const { setError } = formMethods;

  const solBalance = walletBalanceData?.solBalance;
  const onSubmit: SubmitHandler<SendSOLFormSchemaInput> = useCallback(
    ({ recipientAddress, amount }) => {
      const isInsufficientBalance = !solBalance || solBalance < amount;
      const isSameAddress = recipientAddress === publicKey?.toString();
      const isError = isInsufficientBalance || isSameAddress;

      if (isInsufficientBalance) {
        setError('amount', {
          type: 'custom',
          message: 'Insufficient balance',
        });
      }

      if (isSameAddress) {
        setError('recipientAddress', {
          type: 'custom',
          message: 'Cannot send to same address',
        });
      }

      // Skip mutation on validation error
      if (isError) return;

      mutate(
        { recipientAddress, amount },
        {
          // Refetch wallet balance and transaction history on success
          onSuccess: () => {
            refetchWalletBalance();
            refetchTransferHistory();
          },
        }
      );
    },
    [
      solBalance,
      publicKey,
      setError,
      refetchWalletBalance,
      refetchTransferHistory,
      mutate,
    ]
  );

  return { formMethods, onSubmit };
}

export default useSendSolForm;