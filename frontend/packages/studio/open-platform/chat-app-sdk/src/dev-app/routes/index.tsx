import { createBrowserRouter, Outlet } from 'react-router-dom';

import TestAppWidget from '@/dev-app/page/AppWidget';

import { TestClientDemo } from '../page/Client';
import TestChatDemo from '../page/Chat';

const Layout = () => <Outlet />;
export const devRouter: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'chat',
          element: <TestChatDemo />,
        },
        {
          path: 'app_widget',
          element: <TestAppWidget />,
        },
        {
          path: 'client',
          element: <TestClientDemo />,
        },
      ],
    },
  ]);
