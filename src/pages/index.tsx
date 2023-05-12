import { ConnectWallet, SendSOLForm, TransferHistory } from '@/components';
import { Container, Stack } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SOL Transfer History</title>
        <meta name="description" content="Send & view SOL transfers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg">
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          useFlexGap
        >
          <h1>SOL Transfer History</h1>

          <SendSOLForm />

          <ConnectWallet />
        </Stack>

        <TransferHistory />
      </Container>
    </>
  );
}
