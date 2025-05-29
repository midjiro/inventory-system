import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eraser, LoaderCircle, type LucideIcon } from 'lucide-react';
import { CustomFormField } from '@/components/layout/CustomFormField';
import { CustomSelectField } from '@/components/layout/CustomSelectField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { IItem } from '../models';
import type { addInventoryItem, updateInventoryItem } from '../store/actions';
import { selectCategoriesWithLoading } from '../store/selectors';
import { itemFormSchema } from '../validation/item-form';
import { useVerifiedOnly } from '@/modules/auth/hooks/useVerifiedOnly';

const values = {
  product: '',
  category: '',
  sku: '',
  available: 1,
  unitPrice: '',
  location: '',
  totalRevenue: 1,
};

type Props = {
  submitLabel: string;
  submitIcon: LucideIcon;
  submitMessage: string;
  action: typeof addInventoryItem | typeof updateInventoryItem;
  defaultValues?: IItem | null | undefined;
};

export const ItemForm: React.FC<Props> = ({
  submitLabel,
  submitIcon: SubmitIcon,
  submitMessage,
  action,
  defaultValues,
}) => {
  const dispatch = useAppDispatch();
  const { isPending, categories } = useAppSelector(selectCategoriesWithLoading);
  const allowedAction = useVerifiedOnly();

  const options = categories.map(category => ({
    value: category.name.toLowerCase(),
    label: category.name,
  }));

  const form = useForm({
    defaultValues: defaultValues ?? values,
    resolver: yupResolver(itemFormSchema),
  });

  const onReset = () => form.reset(values);
  const onSubmit = (data: IItem) => {
    dispatch(action(data))
      .unwrap()
      .then(() =>
        toast.success('Submitted successfully', { description: submitMessage })
      )
      .then(() => onReset())
      .catch(msg => toast.error(msg));
  };

  return (
    <section className="flex flex-wrap items-center gap-6">
      <QRCodeSVG
        value={form.watch('sku')}
        className="min-w-[288px] basis-1/3 flex-grow flex-shrink"
        level="H"
      />
      <Form {...form}>
        <form
          method="post"
          className="min-w-[288px] basis-1/3 flex-grow flex-shrink space-y-6"
          onSubmit={form.handleSubmit(data => {
            onSubmit(data);
          })}
        >
          <fieldset className="max-w-full">
            <legend className="mb-4">General</legend>
            <div className="flex flex-wrap items-start gap-2">
              <CustomSelectField
                label="Category"
                name="category"
                options={options}
                className="min-w-[288px] basis-full flex-grow flex-shrink"
              />
              <CustomFormField
                label="Product"
                name="product"
                className="min-w-[144px] basis-1/3 flex-grow flex-shrink"
              />
              <CustomFormField
                label="SKU"
                name="sku"
                className="min-w-[144px] basis-1/3 flex-grow flex-shrink"
              />
            </div>
          </fieldset>
          <fieldset className="max-w-full">
            <legend className="mb-4">Availability</legend>
            <div className="flex flex-wrap justify-stretch items-start gap-2">
              <CustomFormField
                type="number"
                min="1"
                step="1"
                label="Available"
                name="available"
                className="min-w-[144px] basis-1/3 flex-grow flex-shrink"
              />
              <CustomFormField
                label="Location"
                name="location"
                className="min-w-[144px] basis-1/3 flex-grow flex-shrink"
              />
            </div>
          </fieldset>

          <fieldset className="max-w-full">
            <legend className="mb-4">Pricing</legend>
            <div className="flex flex-wrap items-start gap-2">
              <CustomFormField
                type="number"
                min="1"
                step="1"
                label="Total Revenue"
                name="totalRevenue"
                className="min-w-[144px] basis-1/3 flex-grow flex-shrink"
              />
              <CustomSelectField
                label="Unit price"
                name="unitPrice"
                options={[
                  { value: 'In stock', label: 'In stock' },
                  { value: 'Low stock', label: 'Low stock' },
                  { value: 'Out of stock', label: 'Out of stock' },
                  { value: 'Discontinued', label: 'Discontinued' },
                ]}
                className="min-w-[144px] basis-1/3 flex-grow flex-shrink"
              />
            </div>
          </fieldset>
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
    </section>
  );
};
