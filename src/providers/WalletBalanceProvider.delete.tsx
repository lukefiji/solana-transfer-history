import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type WalletBalanceContextType = {
  lamportBalance: number | null;
  walletBalance: number | null;
  fetchWalletBalance: () => Promise<void>;
};

const WalletBalanceContext = createContext<WalletBalanceContextType | null>(
  null
);

interface Props {
  children: ReactNode;
}

const WalletBalanceProvider = ({ children }: Props) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [lamportBalance, setLamportBalance] = useState<number | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  // Exposed to invoke after any balance updates
  const fetchWalletBalance = useCallback(async () => {
    if (!publicKey) {
      setWalletBalance(null);
      return;
    }

    const lamports = await connection.getBalance(publicKey);
    const balance = lamports / LAMPORTS_PER_SOL;

    setLamportBalance(lamports);
    setWalletBalance(balance);
  }, [publicKey, connection]);

  // Fetch on page load, and when publicKey/connetion changes
  useEffect(() => {
    fetchWalletBalance();
  }, [fetchWalletBalance]);

  const value = useMemo(
    () => ({
      lamportBalance,
      walletBalance,
      fetchWalletBalance,
    }),
    [lamportBalance, walletBalance, fetchWalletBalance]
  );

  return (
    <WalletBalanceContext.Provider value={value}>
      {children}
    </WalletBalanceContext.Provider>
  );
};

function useWalletBalance() {
  const context = useContext(WalletBalanceContext);
  if (context == undefined) {
    throw new Error(
      'useWalletBalance must be used within a WalletBalanceProvider'
    );
  }
  return context;
}

export { WalletBalanceProvider, useWalletBalance };
