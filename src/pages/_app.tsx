import AlgoliaProvider from '@/providers/AlgoliaProvider';
import Web3Provider from '@/providers/Web3Provider';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

// Roboto font
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

// Material-UI Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

// TanStack Query
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
          <AlgoliaProvider>
            <main className={roboto.className}>
              <Component {...pageProps} />
            </main>
          </AlgoliaProvider>
        </QueryClientProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}
