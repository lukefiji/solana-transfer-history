import { env } from '@/env';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { ReactNode, useMemo } from 'react';

interface Props {
  children: ReactNode;
}

const Web3Provider = ({ children }: Props) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = env.NEXT_PUBLIC_WALLET_ADAPTER_NETWORK;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Web3Provider;
