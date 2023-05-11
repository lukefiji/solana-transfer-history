import useTransferSolMutation from '@/hooks/useTransferSolMutation';
import useWalletBalanceQuery from '@/hooks/useWalletBalanceQuery';
import { sendSOLFormSchema } from '@/schemas/sendSOLForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, Stack } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SendSOLFormSchemaType } from '../../schemas/sendSOLForm';
import AmountInput from './AmountInput';
import RecipientAddressInput from './WalletAddressInput';

const SendSOLForm = () => {
  const { publicKey } = useWallet();

  const { mutate } = useTransferSolMutation();

  const { data } = useWalletBalanceQuery();
  const walletBalance = data?.solBalance;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SendSOLFormSchemaType>({
    defaultValues: {
      recipientAddress: '',
    },
    resolver: zodResolver(sendSOLFormSchema),
  });

  const onSubmit: SubmitHandler<SendSOLFormSchemaType> = ({
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
