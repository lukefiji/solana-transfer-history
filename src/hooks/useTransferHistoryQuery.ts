import { Transfer } from '@prisma/client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

async function fetchTransferHistory(): Promise<Array<Transfer>> {
  const response = await fetch('/api/transfers', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const jsonData: Array<Transfer> = await response.json();

  return jsonData;
}

function useWalletBalanceQuery() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['transferHistory'],
    queryFn: fetchTransferHistory,
  });
}

export default useWalletBalanceQuery;
