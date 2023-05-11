import Web3Provider from '@/providers/Web3Provider';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}
