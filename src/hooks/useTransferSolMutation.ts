import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import useWalletBalanceQuery from './useWalletBalanceQuery';

export interface TransferSolInput {
  recipientAddress: string;
  amount: number;
}

export type UseTransferSolMutationReturn = {
  from: string;
  to: string;
  amount: number;
  lamports: number;
  signature: string;
  block: number;
};

function useTransferSolMutation() {
  const { connection } = useConnection();
  const { data, refetch } = useWalletBalanceQuery();
  const { publicKey, sendTransaction } = useWallet();

  const transferSol = useCallback(
    async ({
      recipientAddress,
      amount,
    }: TransferSolInput): Promise<UseTransferSolMutationReturn> => {
      try {
        if (!publicKey) {
          throw new WalletNotConnectedError();
        }

        const lamportsToSend = amount * LAMPORTS_PER_SOL;

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipientAddress),
            lamports: lamportsToSend,
          })
        );

        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, {
          minContextSlot,
        });

        const signatureResult = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        });

        const dbData = {
          from: publicKey.toString(),
          to: recipientAddress,
          amount,
          lamports: lamportsToSend,
          signature,
          block: signatureResult.context.slot,
        };

        refetch();

        return dbData;
      } catch (error) {
        throw error;
      }
    },
    [publicKey, sendTransaction, connection, refetch]
  );

  return useMutation({ mutationFn: transferSol });
}

export default useTransferSolMutation;
