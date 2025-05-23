import { Logo } from '@/components/common/Logo';
import { RegisterForm } from '@/modules/auth';

export const Register = () => {
  return (
    <article className="min-w-[288px] w-full  max-w-[475px] p-6 rounded-lg border border-zinc-200 bg-white">
      <Logo className="mx-auto" />
      <h2 className="mt-4 mb-2 text-center">Create an account</h2>
      <p className="text-center">
        Create an account to access fast and qualitative inventory management
        tools.
      </p>
      <RegisterForm />
    </article>
  );
};
