import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { NotFound } from '@/pages/NotFound';
import { LogIn } from '@/pages/LogIn';
import { Register } from '@/pages/Register';
import { Centered } from '@/components/layout/Centered';
import { Container } from '@/components/layout/Container';
import { Verification } from '@/pages/Verification';
import { Inventory } from '@/pages/Inventory';
import { AddItem } from '@/pages/AddItem';
import { ItemDetails } from '@/pages/ItemDetails';
import { UpdateItem } from '@/pages/UpdateItem';
import { Categories } from '@/pages/Categories';
import { AddCategory } from '@/pages/AddCategory';
import { UpdateCategory } from '@/pages/UpdateCategory';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Centered />}>
        <Route index element={<LogIn />} />
        <Route path="register" element={<Register />} />
        <Route path="verification" element={<Verification />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/app" element={<Container />}>
        <Route index element={<Dashboard />} />
        <Route path="inventory">
          <Route index element={<Inventory />} />
          <Route path="add" element={<AddItem />} />
          <Route path=":id" element={<ItemDetails />} />
          <Route path="update/:id" element={<UpdateItem />} />
        </Route>
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="add" element={<AddCategory />} />
          <Route path="update/:id" element={<UpdateCategory />} />
        </Route>
      </Route>
    </>
  )
);
