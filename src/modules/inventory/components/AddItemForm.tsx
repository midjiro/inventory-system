import { CustomFormField } from '@/components/layout/CustomFormField';
import { CustomSelectField } from '@/components/layout/CustomSelectField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eraser, LoaderCircle, PackagePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { QRCodeSVG } from 'qrcode.react';
import type { IItem } from '../models';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectInventory } from '../selectors';
import { addInventoryItem } from '../actions';
import { toast } from 'sonner';
import { categories } from '../constants/categories';

const schema = yup.object().shape({
  product: yup.string().required('Product name is required'),
  category: yup.string().required('Category is required'),
  sku: yup.string().required('SKU is required'),
  available: yup
    .number()
    .required('Available quantity is required')
    .min(0, 'Available quantity must be 0 or more'),
  unitPrice: yup
    .string()
    .oneOf(
      ['In stock', 'Low stock', 'Out of stock', 'Discontinued'],
      'Invalid stock status'
    )
    .required('Stock status is required'),
  location: yup.string().required('Location is required'),
  totalRevenue: yup
    .number()
    .required('Total revenue is required')
    .min(0, 'Revenue must be 0 or more'),
});

const defaultValues = {
  product: '',
  category: '',
  sku: '',
  available: 1,
  unitPrice: '',
  location: '',
  totalRevenue: 1,
};

export const AddItemForm = () => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const { isPending } = useAppSelector(selectInventory);

  const onReset = () => form.reset(defaultValues);
  const onSubmit = (data: IItem) =>
    dispatch(addInventoryItem(data))
      .then(() => toast.success('Item added successfully!'))
      .then(onReset)
      .catch(msg => toast.error(msg));

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
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <fieldset className="max-w-full">
            <legend className="mb-4">General</legend>
            <div className="flex flex-wrap items-start gap-2">
              <CustomSelectField
                label="Category"
                name="category"
                options={categories}
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <PackagePlus />
                  <span>Add</span>
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
