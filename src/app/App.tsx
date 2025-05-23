import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/sonner';
import { router } from './router';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster theme="light" />
    </Provider>
  );
}

export default App;
