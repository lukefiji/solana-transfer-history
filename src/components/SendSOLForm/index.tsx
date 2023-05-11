import {
  useTransferSolMutation,
  useWalletBalanceQuery,
  useZodForm,
} from '@/hooks';
import {
  SendSOLFormSchemaInput,
  sendSOLFormSchema,
} from '@/schemas/sendSOLForm';
import { Button, Grid, Stack } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { SubmitHandler } from 'react-hook-form';
import AmountInput from './AmountInput';
import RecipientAddressInput from './WalletAddressInput';

const SendSOLForm = () => {
  const { publicKey } = useWallet();
  const { mutate } = useTransferSolMutation();
  const { data: walletBalanceData } = useWalletBalanceQuery();

  const walletBalance = walletBalanceData?.solBalance;

  const { control, handleSubmit, setError } = useZodForm({
    schema: sendSOLFormSchema,
    defaultValues: {
      recipientAddress: '',
    },
  });

  const onSubmit: SubmitHandler<SendSOLFormSchemaInput> = ({
    recipientAddress,
    amount,
  }) => {
    // Validate wallet balance
    if (!walletBalance || walletBalance < amount) {
      return setError('amount', {
        type: 'custom',
        message: 'Insufficient balance',
      });
    }

    mutate({ recipientAddress, amount });
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

      <Button variant="contained" type="submit" disabled={!publicKey}>
        Send SOL
      </Button>

      <p>Your balance: {walletBalance ? `${walletBalance} SOL` : 'N/A'}</p>
    </Stack>
  );
};

export default SendSOLForm;
