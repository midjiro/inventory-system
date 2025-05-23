import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email('Incorrect email address.')
    .required('This is a required field.'),
  password: yup.string().required('This is a required field.'),
});

export const registerValidationSchema = yup.object({
  name: yup.string().required('Name is required.'),
  email: yup
    .string()
    .email('Incorrect email address.')
    .required('Email address is required.'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters long')
    .max(16, 'Must be at most 16 characters long')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Must contain a number and a special character'
    )
    .required('Password is required.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password.'),
});
