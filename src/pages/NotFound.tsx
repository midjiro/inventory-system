import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <main className="min-h-dvh flex items-center justify-center px-[5%]">
      <article className="min-w-[288px] max-w-1/2 text-center">
        <p>You look a little lost...</p>
        <h1 className="mt-4 mb-6">Page not found</h1>
        <p>
          Page you are looking for was moved or does not exist. Let's bring you
          <Button variant="link" asChild>
            <Link to="/">back to the dashboard.</Link>
          </Button>
        </p>
      </article>
    </main>
  );
};
