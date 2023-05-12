import { ConnectWallet, SendSolForm, TransferHistory } from '@/components';
import { Container, Stack, Typography } from '@mui/material';
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
          spacing={4}
          justifyContent="center"
          alignItems="center"
          useFlexGap
          sx={{ mt: 3 }}
        >
          <Typography variant="h2" align="center" sx={{ fontWeight: 700 }}>
            SOL Transfer History
          </Typography>

          <ConnectWallet />

          <SendSolForm />

          <TransferHistory />
        </Stack>
      </Container>
    </>
  );
}
