import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Dashboard } from '@/pages/Dashboard';
import { NotFound } from '@/pages/NotFound';
import { Container } from '@/components/layout/Container';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Container />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
