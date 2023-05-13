import { Box, Modal, Stack, Typography } from '@mui/material';
import { Transfer } from '@prisma/client';

interface Props {
  selectedTransaction: Transfer | null;
  setSelectedTransaction: (transaction: Transfer | null) => void;
}

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TransactionModal = ({
  selectedTransaction,
  setSelectedTransaction,
}: Props) => {
  const transaction = selectedTransaction;

  return (
    <Modal
      open={!!selectedTransaction}
      onClose={() => setSelectedTransaction(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {!!transaction ? (
        <Box sx={modalStyles}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Transaction Details
            </Typography>
            <Typography>To: {transaction.to}</Typography>
            <Typography>Amount: {transaction.amount} SOL</Typography>
            <Typography>Date: {transaction.createdAt.toString()}</Typography>
            <Typography>Block: {transaction.block}</Typography>
            <Typography>Signature: {transaction.signature}</Typography>
          </Stack>
        </Box>
      ) : (
        <Box sx={modalStyles}>Error loading transaction</Box>
      )}
    </Modal>
  );
};

export default TransactionModal;
