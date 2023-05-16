import { env } from '@/env';
import { useWallet } from '@solana/wallet-adapter-react';
import algoliasearch from 'algoliasearch/lite';
import { ReactNode } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';

interface Props {
  children: ReactNode;
}

// Algolia Search
const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

const AlgoliaProvider = ({ children }: Props) => {
  const { publicKey } = useWallet();

  console.log(`from:${publicKey}`);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
    >
      <Configure filters={`from:${publicKey}`} />

      {children}
    </InstantSearch>
  );
};

export default AlgoliaProvider;
