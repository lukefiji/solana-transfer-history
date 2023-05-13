import { SendSolFormSchemaInput } from '@/schemas/sendSolForma';
import { InputAdornment, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface Props {
  control: Control<SendSolFormSchemaInput>;
  name: keyof SendSolFormSchemaInput;
  disabled?: boolean;
}

const AmountInput = ({ name, control, disabled }: Props) => {
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
          disabled={disabled}
        />
      )}
    />
  );
};

export default AmountInput;
