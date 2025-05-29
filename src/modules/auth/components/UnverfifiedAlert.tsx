import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MailQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnverifiedAlert = () => {
  return (
    <Alert variant={'destructive'} className="bg-red-100 border-red-300">
      <MailQuestion className="h-4 w-4" />
      <AlertTitle>Access is restricted!</AlertTitle>
      <AlertDescription>
        <p className="text-red-400">
          You can get more abilities by{' '}
          <Link
            to="/verification"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-red-600 px-0'
            )}
          >
            verifying
          </Link>{' '}
          your email address.
        </p>
      </AlertDescription>
    </Alert>
  );
};
