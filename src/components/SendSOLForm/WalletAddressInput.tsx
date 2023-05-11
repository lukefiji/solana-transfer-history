import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { SendSOLFormSchemaType } from '../../schemas/sendSOLForm';

interface Props {
  name: keyof SendSOLFormSchemaType;
  control: Control<SendSOLFormSchemaType>;
}

const RecipientAddressInput = ({ name, control }: Props) => {
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
        />
      )}
    />
  );
};

export default RecipientAddressInput;
