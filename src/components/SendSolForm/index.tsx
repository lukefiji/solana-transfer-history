import { useWalletBalanceQuery } from '@/hooks';
import useSendSolForm from '@/hooks/useSendSolForm';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useIsMutating } from '@tanstack/react-query';
import AmountInput from './AmountInput';
import RecipientAddressInput from './WalletAddressInput';

const SendSolForm = () => {
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
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
          Transfer SOL
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <RecipientAddressInput
              name="recipientAddress"
              disabled={isFormDisabled}
              control={control}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <AmountInput
              name="amount"
              disabled={isFormDisabled}
              control={control}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ position: 'relative', width: '100%' }}>
        <Button
          variant="contained"
          type="submit"
          disabled={isFormDisabled}
          sx={{ width: '100%' }}
        >
          {publicKey ? 'Send SOL' : 'Connect wallet'}
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

      <Typography variant="body1">
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
      </Typography>
    </Stack>
  );
};

export default SendSolForm;
