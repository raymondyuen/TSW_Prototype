import React, { useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Image, Card } from 'antd';
import Menu from './Menu';
const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let username = values.username;
    setShowMenu(true);

  };
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{ minWidth: '800px', minHeight: 600 }}>


      <h1>Home</h1>

    </div>
  );
};

export default App;