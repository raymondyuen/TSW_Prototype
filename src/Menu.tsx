import React, { useState } from 'react';
import { Row, Col, Select, Image, Flex, Menu, ConfigProvider, theme } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    navigate(`/${value}`, { replace: true });
  };
  const [collapsed, setCollapsed] = useState(false);
  return (

    <div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 100,
              iconSize: 50
            },
          },
        }}
      >
      </ConfigProvider>
      <Row align="bottom">

        <Col span={18}><Flex gap="small" justify='flex-start'>
          <Col><Image
            width={300}
            src="./tsw_logo.png" preview={false}
          /></Col>


          {(true) ? "" :
            <Col> Function ID : <Select
              style={{ width: 600 }}
              defaultValue={window.location.pathname.substr(1)}
              aria-label='function ID'
              onChange={handleChange}
              options={[
                {
                  label: <span>Common Function</span>,
                  title: 'Common Function',
                  options: [
                    { label: <span>UF-EM-CM-009 Issue Query for Outstanding Manifest Advice</span>, value: 'Cm009' },
                    { label: <span>UF-EM-CM-020 Create Highlighting Critical Outstanding Manifest Cases</span>, value: 'Cm020' },

                  ],
                },
                {
                  label: <span>CA Function</span>,
                  title: 'CA Function',
                  options: [
                    { label: <span>UF-EM-CA-003 Enquiry of Schedules and Manifest for Probable Matching</span>, value: 'Ca003Enquiry' },
                  ],
                },
              ]}
            /></Col>
          }
        </Flex></Col>
        <Col span={6}><Flex gap="small" justify='flex-end'>
          <Menu mode="horizontal">
            <Menu.SubMenu title="" icon={<UserOutlined />}>

              <Menu.Item key="login" style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }} icon={<AppstoreOutlined />}>
                <a href="/">
                  <h3>Logout</h3>
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>

        </Flex></Col>
      </Row>


    </div>
  );
}

export default App;