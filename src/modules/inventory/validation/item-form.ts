import * as yup from 'yup';

export const itemFormSchema = yup.object().shape({
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
