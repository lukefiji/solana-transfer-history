import { PublicKey } from '@solana/web3.js';

function isValidAddress(address: string) {
  try {
    const recipientWallet = new PublicKey(address);
    return PublicKey.isOnCurve(recipientWallet);
  } catch {
    return false;
  }
}

export default isValidAddress;
