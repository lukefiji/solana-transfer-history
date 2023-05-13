import { Transfer } from '@prisma/client';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

async function fetchTransferHistory(publicKey: string) {
  const params = new URLSearchParams({ publicKey }).toString();

  const response = await fetch(`/api/transfers?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const jsonData: Array<Transfer> = await response.json();

  return jsonData;
}

function useWalletBalanceQuery(publicKey: PublicKey | null) {
  const pubkey = publicKey?.toString() || '';

  return useQuery({
    queryKey: ['transferHistory', pubkey],
    queryFn: () => fetchTransferHistory(pubkey),
    enabled: !!pubkey,
  });
}

export default useWalletBalanceQuery;
