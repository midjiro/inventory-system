import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomFormField } from '@/components/layout/CustomFormField';
import { registerValidationSchema } from '@/modules/auth/validation/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { register } from '@/modules/auth/store/actions';
import { selectUserPending } from '@/modules/auth/store/selectors';
import { toast } from 'sonner';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: { name: '', email: '', password: '', password2: '' },
  });

  const isPending = useAppSelector(selectUserPending);

  return (
    <Form {...form}>
      <form
        method="post"
        className="mt-6 space-y-2"
        onSubmit={form.handleSubmit(data =>
          dispatch(register(data))
            .unwrap()
            .then(() => navigate('/app'))
            .catch(error =>
              toast.error('Error occurred', { description: error })
            )
        )}
      >
        <CustomFormField name="name" label="Full name*" type="text" />
        <CustomFormField name="email" label="Email address*" type="email" />
        <CustomFormField
          name="password"
          label="Password*"
          type="password"
          description="Password must be at least 8 to 16 characters long. Must contain special characters and numbers"
        />
        <CustomFormField
          name="password2"
          label="Repeat password*"
          type="password"
        />
        <Button variant={'link'} className="block w-max mx-auto" asChild>
          <Link to="/">Already have an account?</Link>
        </Button>
        <Button className="w-full" disabled={isPending}>
          {isPending ? 'Creating account...' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
};
