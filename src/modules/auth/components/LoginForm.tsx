import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomFormField } from '@/components/layout/CustomFormField';
import { loginValidationSchema } from '@/modules/auth/validation/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { login } from '@/modules/auth/actions';
import { selectUserPending } from '@/modules/auth/selectors';
import { toast } from 'sonner';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: { email: '', password: '' },
  });
  const isPending = useAppSelector(selectUserPending);

  return (
    <Form {...form}>
      <form
        method="post"
        className="mt-6 space-y-2"
        onSubmit={form.handleSubmit(data =>
          dispatch(login(data))
            .unwrap()
            .then(() => navigate('/app'))
            .catch(error =>
              toast.error('Error occurred', { description: error })
            )
        )}
      >
        <CustomFormField name="email" label="Email address*" type="email" />
        <CustomFormField name="password" label="Password*" type="password" />
        <Button variant={'link'} className="block w-max mx-auto" asChild>
          <Link to="/register">Still have no account?</Link>
        </Button>
        <Button className="w-full" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Continue'}
        </Button>
      </form>
    </Form>
  );
};
