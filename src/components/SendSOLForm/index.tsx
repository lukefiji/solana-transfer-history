import { useWalletBalanceQuery } from '@/hooks';
import useSendSolForm from '@/hooks/useSendSolForm';
import { Box, Button, CircularProgress, Grid, Stack } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useIsMutating } from '@tanstack/react-query';
import AmountInput from './AmountInput';
import RecipientAddressInput from './WalletAddressInput';

const SendSOLForm = () => {
  const { publicKey } = useWallet();
  const { data: walletBalanceData, isLoading: isBalanceLoading } =
    useWalletBalanceQuery();

  const isMutating = useIsMutating({ mutationKey: ['transferSol'] });
  const isTransferring = isMutating > 0;

  const {
    formMethods: { control, handleSubmit },
    onSubmit,
  } = useSendSolForm();

  const solBalance = walletBalanceData?.solBalance;
  const isFormDisabled = !publicKey || isTransferring;

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <RecipientAddressInput
            name="recipientAddress"
            disabled={isFormDisabled}
            control={control}
          />
        </Grid>

        <Grid item lg={4}>
          <AmountInput
            name="amount"
            disabled={isFormDisabled}
            control={control}
          />
        </Grid>
      </Grid>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <Button
          variant="contained"
          type="submit"
          disabled={isFormDisabled}
          sx={{ width: '100%' }}
        >
          {publicKey ? 'Send SOL' : 'Please connect wallet'}
        </Button>

        {isTransferring && (
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
        ) : solBalance ? (
          `${solBalance} SOL`
        ) : (
          'N/A'
        )}
      </p>
    </Stack>
  );
};

export default SendSOLForm;
