import { SendSolFormSchemaInput } from '@/schemas/sendSolForma';
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface Props {
  control: Control<SendSolFormSchemaInput>;
  name: keyof SendSolFormSchemaInput;
  disabled?: boolean;
}

const RecipientAddressInput = ({ control, name, disabled }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...fieldProps }, fieldState: { error } }) => (
        <TextField
          {...fieldProps}
          inputRef={ref}
          fullWidth
          variant="outlined"
          label="Wallet Address"
          error={!!error}
          helperText={error?.message}
          disabled={disabled}
          autoComplete="off"
        />
      )}
    />
  );
};

export default RecipientAddressInput;
