import { Logo } from '@/components/common/Logo';
import { LoginForm, useAutoLogin, useUnauthorizedOnly } from '@/modules/auth';

export const LogIn = () => {
  useAutoLogin();
  useUnauthorizedOnly();

  return (
    <article className="min-w-[288px] w-full  max-w-[475px] p-6 rounded-lg border border-zinc-200 bg-white">
      <Logo className="mx-auto" />
      <h2 className="mt-4 mb-2 text-center">Login</h2>
      <p className="text-center">Login to manage your inventory</p>
      <LoginForm />
    </article>
  );
};
