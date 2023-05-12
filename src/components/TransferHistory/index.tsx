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

const trimTextStyles = {
  maxWidth: 150,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  borderStyle: 'border-box',
};

const TransferHistory = ({}: Props) => {
  const { data: transferHistoryData } = useTransferHistoryQuery();
  const transferHistory = transferHistoryData ?? [];

  console.log(JSON.stringify(transferHistory));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="SOL transfer history">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Block</TableCell>
            <TableCell align="right">Signature</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transferHistory.map((row) => (
            <TableRow
              key={row.objectID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={trimTextStyles}>
                {row.from}
              </TableCell>
              <TableCell align="right" sx={trimTextStyles}>
                {row.to}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.block}</TableCell>
              <TableCell align="right" sx={trimTextStyles}>
                {row.signature}
              </TableCell>
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
