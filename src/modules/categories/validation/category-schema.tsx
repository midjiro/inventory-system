import * as yup from 'yup';

export const categorySchema = yup.object({
  name: yup.string().required(),
  description: yup.string().max(64, 'Description is too long.').optional(),
});
