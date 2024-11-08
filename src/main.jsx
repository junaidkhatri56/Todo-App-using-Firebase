import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap with Layout to include Navbar
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
