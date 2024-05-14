import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '*',
    element: <Error />,
  }
]);

root.render(
  <RouterProvider router={router} />
);

reportWebVitals();