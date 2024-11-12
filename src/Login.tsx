import React, {useState} from "react";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Col, Divider, Flex, Form, Input, Row} from 'antd';
import {useNavigate} from 'react-router-dom';

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let username = values.username;
    //setShowMenu(true);
    //navigate("/home");
    window.location.href = "/home";
  };
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='center' >
      
      <Form
        name="login"
         layout="vertical"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        
        <div style={{ display: showMenu ? 'none' : 'block' }}>

        <Card title="Login to Hong Kong Trade Single Window"  style={{ marginTop:100, minWidth: '600px' }} headStyle={{ backgroundColor: '#1677ff', color: '#ffffff' }}>
          <Form.Item label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
          <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item label="Password"
            name="password"  
           rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password  prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Row style={{marginTop:100}}>
          <Col span={12}><Flex gap="small" justify='flex-start'><a href='/'>Forget Password</a></Flex></Col>
          <Col span={12}><Flex gap="small" justify='flex-end'>
            <Button type="primary" htmlType="submit" style={{paddingLeft:60,paddingRight:60}}>
            Login
          </Button></Flex></Col>
          </Row>
          <Divider />
          <a href='/'>Switch to DP Login</a>
         
         
     
        
          </Card>
        </div>
      </Form>
     
      <div style={{ display: showMenu ? 'block' : 'none' }}>
  
      </div>

    </div>
  );
};

export default App;