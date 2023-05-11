import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamic import to prevent hydration errors
const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-material-ui')).WalletDisconnectButton,
  { ssr: false }
);

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-material-ui')).WalletMultiButton,
  { ssr: false }
);

const Connect = () => {
  return (
    <Stack direction="row" spacing={2}>
      <WalletMultiButtonDynamic />
      <WalletDisconnectButtonDynamic />
    </Stack>
  );
};

export default Connect;
