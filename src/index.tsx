import React from 'react';
import Root from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CM009 from './Cm009';
import CM020 from './Cm020';
import Menu from './Menu';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { createRoot } from 'react-dom/client';


const container = document.getElementById('app');

const router = createBrowserRouter([
  {
    path:"/",
    element: <Menu />,
  },
  {
    path: "/CM009",
    element: <CM009 />,
  },
  {
    path: "/CM020",
    element: <CM020 />,
  }
]);
const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
