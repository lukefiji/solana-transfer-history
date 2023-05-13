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
import { Transfer } from '@prisma/client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import TransactionModal from './TransactionModal';

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

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transfer | null>(null);

  if (!publicKey) {
    return null;
    // <Box>
    //   <Typography variant="h6">Please connect a wallet.</Typography>
    // </Box>
  }

  console.log(selectedTransaction);

  return (
    <>
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
              transferHistory.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={trimTextStyles(100)}
                  >
                    {transaction.from}
                  </TableCell>
                  <TableCell align="right" sx={trimTextStyles(100)}>
                    {transaction.to}
                  </TableCell>
                  <TableCell align="right">{transaction.amount} SOL</TableCell>
                  <TableCell align="right">{transaction.block}</TableCell>
                  <TableCell sx={trimTextStyles(150)}>
                    {transaction.signature}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(transaction.createdAt).toLocaleDateString(
                      'en-US'
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TransactionModal
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
      />
    </>
  );
};

export default TransferHistory;
