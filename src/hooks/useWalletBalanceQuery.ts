import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export type UseWalletBalanceReturn = {
  solBalance: number | null;
  lamportBalance: number | null;
};

async function fetchWalletBalance(
  connection: Connection,
  publicKey: PublicKey | null
): Promise<UseWalletBalanceReturn> {
  if (!publicKey) return { solBalance: null, lamportBalance: null };

  const lamports = await connection.getBalance(publicKey);
  const balance = lamports / LAMPORTS_PER_SOL;

  return { solBalance: balance, lamportBalance: lamports };
}

function useWalletBalanceQuery() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ['balance', publicKey],
    queryFn: () => fetchWalletBalance(connection, publicKey),
  });
}

export default useWalletBalanceQuery;
