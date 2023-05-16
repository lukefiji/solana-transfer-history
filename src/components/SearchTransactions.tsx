import { Transfer } from '@/schemas/transfer';
import { Autocomplete, Box, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web';

interface HighlightedTextProps {
  text: string;
  inputValue: string;
}

const HighlightedText = ({ text, inputValue }: HighlightedTextProps) => {
  const matches = match(text, inputValue, { insideWords: true });
  const parts = parse(text, matches);

  return (
    <>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            fontWeight: part.highlight ? 700 : 400,
          }}
        >
          {part.text}
        </span>
      ))}
    </>
  );
};

interface Props {}

const SearchBox = ({}: Props) => {
  const { query, refine, clear } = useSearchBox();
  const { hits } = useHits<Transfer>({});

  console.log(query, hits);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      options={hits}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.signature
      }
      renderOption={(props, option, state) => {
        console.log({ props, option, state });

        return (
          <li {...props}>
            <Box>
              To{' '}
              <HighlightedText text={option.to} inputValue={state.inputValue} />
            </Box>
            <Box>
              Amount{' '}
              <HighlightedText
                text={`${option.amount}`}
                inputValue={state.inputValue}
              />
            </Box>
            <Box>
              Lamports{' '}
              <HighlightedText
                text={`${option.lamports}`}
                inputValue={state.inputValue}
              />
            </Box>
            <Box>
              Block{' '}
              <HighlightedText
                text={`${option.block}`}
                inputValue={state.inputValue}
              />
            </Box>
            <Box>
              Signature{' '}
              <HighlightedText
                text={option.signature}
                inputValue={state.inputValue}
              />
            </Box>
            <Box>
              Created {new Date(option.createdAt).toLocaleDateString('en-US')}
            </Box>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={query}
          onChange={(e) => refine(e.target.value)}
          label="Search transaction history"
        />
      )}
    />
  );
};

export default SearchBox;
