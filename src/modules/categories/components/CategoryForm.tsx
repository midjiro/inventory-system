import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eraser, LoaderCircle, type LucideIcon } from 'lucide-react';
import { CustomFormField } from '@/components/layout/CustomFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectCategories } from '../store/selectors';
import type { ICategory } from '../model';
import type { addCategory, updateCategory } from '../store/actions';
import { categorySchema } from '../validation/category-schema';
import { CustomTextareaField } from '@/components/layout/CustomTextareaField';
import { useVerifiedOnly } from '@/modules/auth/hooks/useVerifiedOnly';

const values = {
  name: '',
  description: '',
};

type Props = {
  submitLabel: string;
  submitIcon: LucideIcon;
  submitMessage: string;
  action: typeof addCategory | typeof updateCategory;
  defaultValues?: ICategory | null | undefined;
};

export const CategoryForm: React.FC<Props> = ({
  submitLabel,
  submitIcon: SubmitIcon,
  submitMessage,
  action,
  defaultValues,
}) => {
  const dispatch = useAppDispatch();
  const { isPending } = useAppSelector(selectCategories);
  const allowedAction = useVerifiedOnly();

  const form = useForm({
    defaultValues: defaultValues ?? values,
    resolver: yupResolver(categorySchema),
  });

  const onReset = () => form.reset(values);
  const onSubmit = (data: any) => {
    dispatch(action(data))
      .unwrap()
      .then(() =>
        toast.success('Submitted successfully', { description: submitMessage })
      )
      .then(() => onReset())
      .catch(msg => toast.error(msg));
  };

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(data => {
          onSubmit(data);
        })}
        className="space-y-6"
      >
        <CustomFormField label="Name" name="name" />
        <CustomTextareaField label="Description" name="description" />

        <div className="max-w-full flex flex-col justify-stretch items-center gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !allowedAction}
          >
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <SubmitIcon />
                <span>{submitLabel}</span>
              </>
            )}
          </Button>
          <Button
            type="reset"
            variant={'destructive'}
            className="w-full"
            onClick={onReset}
            disabled={isPending}
          >
            <Eraser />
            <span>Reset</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
