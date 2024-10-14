import React, { useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, Image } from 'antd';
import Menu from './Menu';
const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let username = values.username;
    setShowMenu(true);

  };
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='center' >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}

      >
        
        <div style={{ display: showMenu ? 'none' : 'block' }}>
        <Image
          width={300}
          src="./tsw_logo.png"
        />
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
          // rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>


          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>

          </Form.Item>
        </div>
      </Form>
      <div style={{ display: showMenu ? 'block' : 'none' }}>
        <Menu
        ></Menu>
      </div>

    </div>
  );
};

export default App;