import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { SendSOLFormSchemaInput } from '../../schemas/sendSOLForm';

interface Props {
  control: Control<SendSOLFormSchemaInput>;
  name: keyof SendSOLFormSchemaInput;
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
