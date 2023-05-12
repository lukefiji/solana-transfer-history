import { useTransferHistoryQuery } from '@/hooks';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ReactNode } from 'react';

interface Props {}

const CustomTableCell = ({ children, ...props }: { children: ReactNode }) => (
  <TableCell {...props}>{children}</TableCell>
);

const trimTextStyles = (width: number = 150) => ({
  maxWidth: width,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TransferHistory = ({}: Props) => {
  const { data: transferHistoryData } = useTransferHistoryQuery();
  const transferHistory = transferHistoryData ?? [];

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
          {transferHistory.map((row) => (
            <TableRow
              key={row.objectID}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransferHistory;
