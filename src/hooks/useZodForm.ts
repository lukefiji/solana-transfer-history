import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { TypeOf, ZodSchema } from 'zod';

interface UseZodFormProps<Z extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<Z>>, 'resolver'> {
  schema: Z;
}

function useZodForm<Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) {
  const formMethods = useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });

  return formMethods;
}

export default useZodForm;
