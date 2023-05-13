import { useTransferHistoryQuery } from '@/hooks';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';

const trimTextStyles = (width: number = 150) => ({
  maxWidth: width,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

interface Props {}

const TransferHistory = ({}: Props) => {
  const { publicKey } = useWallet();
  const { data, isLoading } = useTransferHistoryQuery(publicKey);
  const transferHistory = data ?? [];

  if (!publicKey) {
    return null;
    // <Box>
    //   <Typography variant="h6">Please connect a wallet.</Typography>
    // </Box>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="SOL transfer history">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Block</TableCell>
            <TableCell>Signature</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                colSpan={6}
                scope="row"
                sx={{ verticalAlign: 'center', textAlign: 'center', py: 8 }}
              >
                <CircularProgress size={48} />
              </TableCell>
            </TableRow>
          ) : (
            transferHistory.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={trimTextStyles(100)}>
                  {row.from}
                </TableCell>
                <TableCell align="right" sx={trimTextStyles(100)}>
                  {row.to}
                </TableCell>
                <TableCell align="right">{row.amount} SOL</TableCell>
                <TableCell align="right">{row.block}</TableCell>
                <TableCell sx={trimTextStyles(150)}>{row.signature}</TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleDateString('en-US')}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransferHistory;
