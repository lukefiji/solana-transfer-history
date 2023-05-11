import { InputAdornment, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { SendSOLFormSchemaInput } from '../../schemas/sendSOLForm';

interface Props {
  name: keyof SendSOLFormSchemaInput;
  control: Control<SendSOLFormSchemaInput>;
}

const AmountInput = ({ name, control }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ref, ...fieldProps },
        fieldState: { error },
      }) => (
        <NumericFormat
          {...fieldProps}
          allowNegative={false}
          decimalScale={9}
          onValueChange={(values) => {
            onChange(values.floatValue);
          }}
          customInput={TextField}
          getInputRef={ref}
          fullWidth
          variant="outlined"
          label="Amount"
          placeholder="0"
          InputProps={{
            endAdornment: <InputAdornment position="end">SOL</InputAdornment>,
          }}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default AmountInput;
