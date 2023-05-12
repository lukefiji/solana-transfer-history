import { SendSOLFormSchemaInput } from '@/schemas/sendSOLForm';
import { Transfer } from '@/schemas/transfer';
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

function useTransferSolMutation() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const transferSol = useCallback(
    async ({
      recipientAddress,
      amount,
    }: SendSOLFormSchemaInput): Promise<Transfer> => {
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

        const transferData = {
          from: publicKey.toString(),
          to: recipientAddress,
          amount,
          lamports: lamportsToSend,
          signature,
          block: signatureResult.context.slot,
        };

        // Save to database
        const response = await fetch('/api/transfers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transferData),
        });
        const jsonData: Transfer = await response.json();

        return jsonData;
      } catch (error) {
        throw error;
      }
    },
    [publicKey, sendTransaction, connection]
  );

  return useMutation({ mutationFn: transferSol });
}

export default useTransferSolMutation;
