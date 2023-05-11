import { isValidAddress } from '@/utils';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useCallback, useState } from 'react';
import useWalletBalanceQuery from './useWalletBalanceQuery';

enum State {
  IDLE,
  CONFIRMING,
  SUCCESS,
  ERROR,
}

type UseTransferMutationReturn = {
  onSend: (recipientAddress: string, amount: number) => Promise<void>;
  state: State;
  message: string | null;
};

function useTransferMutation(): UseTransferMutationReturn {
  const { connection } = useConnection();
  const { data, refetch } = useWalletBalanceQuery();
  const { publicKey, sendTransaction } = useWallet();

  const lamportBalance = data?.lamportBalance;

  const [state, setState] = useState<State>(State.IDLE);
  const [message, setMessage] = useState<string | null>(null);

  const onSend = useCallback(
    async (recipientAddress: string, amount: number) => {
      try {
        if (!publicKey) {
          throw new WalletNotConnectedError();
        }

        if (!amount) {
          throw new Error('Amount required');
        }

        if (!isValidAddress(recipientAddress)) {
          throw new Error('Invalid wallet address');
        }

        if (amount <= 0) {
          throw new Error('Amount must be greater than 0');
        }

        const lamportsToSend = amount * LAMPORTS_PER_SOL;

        if (!lamportBalance || lamportsToSend > lamportBalance) {
          throw new Error('Insufficient balance');
        }

        setState(State.CONFIRMING);
        setMessage(`Sending ${amount} SOL (${lamportsToSend} lamports)...`);

        const toPublicKey = new PublicKey(recipientAddress);
        const transferTransaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPublicKey,
            lamports: lamportsToSend,
          })
        );

        const data = await connection.getLatestBlockhashAndContext();
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = data;

        const signature = await sendTransaction(
          transferTransaction,
          connection,
          {
            minContextSlot,
          }
        );

        const signatureResult = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        });

        const dbData = {
          from: publicKey,
          to: toPublicKey,
          amount,
          lamports: lamportsToSend,
          signature,
          block: signatureResult.context.slot,
        };

        setState(State.SUCCESS);
        setMessage(`Successfully sent ${amount} SOL!`);

        // Update wallet balance on success
        refetch();
      } catch (error) {
        console.error(error);
        setState(State.ERROR);
        setMessage(`${error}`);
      }
    },
    [publicKey, sendTransaction, connection, lamportBalance, refetch]
  );

  return { onSend, state, message };
}

export default useTransferMutation;
