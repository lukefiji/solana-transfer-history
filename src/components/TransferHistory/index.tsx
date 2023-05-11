import { useTransferHistoryQuery } from '@/hooks';
import { Stack } from '@mui/material';

interface Props {}

const TransferHistory = ({}: Props) => {
  const { data: transferHistoryData } = useTransferHistoryQuery();
  const transferHistory = transferHistoryData ?? [];

  console.log(transferHistoryData);
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" useFlexGap>
      {transferHistory.map((item) => (
        <div key={item.id}>
          <p>From: {item.from}</p>
          <p>To: {item.to}</p>
          <p>
            Amount: {item.amount} SOL ({item.lamports} lamports)
          </p>
          <p>Block: {item.block}</p>
          <p>Signature: {item.signature}</p>
          <p>Created: {new Date(item.createdAt).toString()}</p>
        </div>
      ))}
    </Stack>
  );
};

export default TransferHistory;
