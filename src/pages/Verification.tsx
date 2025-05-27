import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectCurrentUser, useAutoLogin, verify } from '@/modules/auth';
import { sendVerificationEmail } from '@/modules/auth/actions';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const Verification = () => {
  const dispatch = useAppDispatch();
  const { isPending, currentUser } = useAppSelector(selectCurrentUser);
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const oobCode = urlParams.get('oobCode');

  useAutoLogin();

  useEffect(() => {
    if (mode !== 'verifyEmail' || !oobCode || currentUser?.emailVerified)
      return;

    dispatch(verify(oobCode))
      .then(() => toast.success('Email address successfully verified'))
      .catch(msg => toast.error(msg));
  }, [dispatch, mode, oobCode, currentUser]);

  if (currentUser?.emailVerified)
    return (
      <article className="min-w-[288px] max-w-1/2 text-center">
        <p>You're secure!</p>
        <h1>Email address verified!</h1>
        <p className="mt-4 mb-6">
          You helped a lot! Now your account verified & secure.
        </p>
        <Button asChild disabled={isPending}>
          <Link to={currentUser ? '/app' : '/'}>
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" />{' '}
                <span>Processing...</span>
              </>
            ) : (
              'Back to work'
            )}
          </Link>
        </Button>
      </article>
    );

  return (
    <article className="min-w-[288px] max-w-1/2 text-center">
      <p>Secure your account</p>
      <h1>
        {currentUser?.emailVerified
          ? 'Verifying your email address...'
          : 'Verify your email address.'}
      </h1>
      <p className="mt-4 mb-6">
        Help us create more secure app. Verify your email so we can be sure your
        account is safe.
      </p>
      <Button
        disabled={!currentUser?.emailVerified}
        onClick={() =>
          sendVerificationEmail()
            .then(() =>
              toast.success('Check your email.', {
                description: 'Verification email successfully sent.',
              })
            )
            .catch(msg => toast.error(msg))
        }
      >
        Send verification email
      </Button>
    </article>
  );
};
