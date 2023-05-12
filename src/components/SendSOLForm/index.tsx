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
import { Box, Button, CircularProgress, Grid, Stack } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { SubmitHandler } from 'react-hook-form';
import AmountInput from './AmountInput';
import RecipientAddressInput from './WalletAddressInput';

const SendSOLForm = () => {
  const { publicKey } = useWallet();
  const {
    data: walletBalanceData,
    refetch: refetchWalletBalance,
    isLoading: isBalanceLoading,
  } = useWalletBalanceQuery();
  const { refetch: refetchTransferHistory } = useTransferHistoryQuery();
  const { mutate, isLoading: isMutationLoading } = useTransferSolMutation();

  const { control, handleSubmit, setError } = useZodForm({
    schema: sendSOLFormSchema,
    defaultValues: {
      recipientAddress: '',
    },
  });

  const walletBalance = walletBalanceData?.solBalance;

  const onSubmit: SubmitHandler<SendSOLFormSchemaInput> = ({
    recipientAddress,
    amount,
  }) => {
    const isInsufficientBalance = !walletBalance || walletBalance < amount;
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

    // Skip mutation on error
    if (isError) return;

    mutate(
      { recipientAddress, amount },
      {
        onSuccess: () => {
          // Refetch wallet balance and transaction history after success
          refetchWalletBalance();
          refetchTransferHistory();
        },
      }
    );
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <RecipientAddressInput name="recipientAddress" control={control} />
        </Grid>

        <Grid item lg={4}>
          <AmountInput name="amount" control={control} />
        </Grid>
      </Grid>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <Button
          variant="contained"
          type="submit"
          disabled={!publicKey || isMutationLoading}
          sx={{ width: '100%' }}
        >
          {publicKey ? 'Send SOL' : 'Please connect wallet'}
        </Button>

        {isMutationLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>

      <p>
        Your balance:{' '}
        {isBalanceLoading ? (
          <CircularProgress
            size={16}
            sx={{ position: 'relative', bottom: '-3px', ml: '4px' }}
          />
        ) : walletBalance ? (
          `${walletBalance} SOL`
        ) : (
          'N/A'
        )}
      </p>
    </Stack>
  );
};

export default SendSOLForm;
