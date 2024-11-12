import './index.css';
import reportWebVitals from './reportWebVitals';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import IndexLayout from './IndexLayout';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const items2 = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(<IndexLayout/>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
