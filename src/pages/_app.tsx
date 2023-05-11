import Web3Provider from '@/providers/Web3Provider';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import algoliasearch from 'algoliasearch/lite';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { InstantSearch } from 'react-instantsearch-hooks';

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

// Algolia Search
const searchClient = algoliasearch(
  '2KPWEBR2T1',
  '33c32fa172c60ecdd1cecdc319af185d'
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <InstantSearch searchClient={searchClient} indexName="instant_search">
            <main className={roboto.className}>
              <Component {...pageProps} />
            </main>
          </InstantSearch>
        </QueryClientProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}
