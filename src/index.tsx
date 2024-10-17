import { Route, BrowserRouter as Routers, Routes } from 'react-router-dom';

import './index.css';
import CM009 from './Cm009';
import CM020 from './Cm020';
import CM020S3 from './Cm020S3';
import Login from './Login';
import Menu from './Menu';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";

import { createRoot } from 'react-dom/client';
import Ca003Enquiry from './Ca003Enquiry';
import CA003Amend from './Ca003Amend';


const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
  },
  {
    path: "/CM009",
    element: <CM009 />,
  },
  {
    path: "/CM020",
    element: <CM020 />,
  },
  {
    path: "/CM020S3",
    element: <CM020S3 />,
  },
  {
    path: "/CA003Amend",
    element: <CA003Amend />,
  },
  {
    path: "/CA003Enquiry",
    element: <Ca003Enquiry />,
  }
]);
const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Routers>
  <Menu />
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/CM009" element={<CM009 />} />
    <Route path="/CM020" element={<CM020 />} />
    <Route path="/CM020S3" element={<CM020S3 />} />
    <Route path="/CA003Amend" element={<CA003Amend />} />
    <Route path="/Ca003Enquiry" element={<Ca003Enquiry />} />
    <Route path="*" element={<Login />} />
  </Routes>
</Routers>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
