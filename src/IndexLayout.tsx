import { BrowserRouter as Routers, Link, Route, Routes } from 'react-router-dom';
import {
  AppstoreOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import './index.css';
import CM009 from './Cm009';
import CM020 from './Cm020';
import CM020S3 from './Cm020S3';
import CA003New from './Ca003New';
import CA003View from './Ca003View'
import Home from './Home';
import Login from './Login';
import HeaderNavs from './Menu';
import React, { createContext, useState } from 'react';
import Ca003Enquiry from './Ca003Enquiry';
import Ca003EnquiryCED from './Ca003EnquiryCED';
import CA003Amend from './Ca003Amend';
import { Button, Col, Divider, Flex, Image, Layout, Menu, Row } from 'antd';

interface UserContextType {
  isTsp: String;
  setIsTsp: React.Dispatch<React.SetStateAction<String>>;
}

const { Header, Content, Footer, Sider } = Layout;
const items2 = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

export const UserContext = createContext<UserContextType | null>(null);

const onClickChangeUser = (isTsp: String, setIsTcp: React.Dispatch<React.SetStateAction<String>>) => {
  if (isTsp === "TSP") {
    setIsTcp("ETCS");
  } else {
    setIsTcp("TSP");
  }
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isTsp, setIsTsp] = useState<String>("C&SD");

  return (
    <Routers>
        <Layout>
          {(window.location.pathname === '/') ? "" :

            <Sider width="230"
              breakpoint="lg"
              // collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed + ' ' + type);
              }}
              collapsed={collapsed}
            >
              <div className="demo-logo-vertical" />
              <Menu theme="dark" mode="inline" defaultOpenKeys={['home']} defaultSelectedKeys={['home']} style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }} disabledOverflow>
                <Menu.Item key="login" style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }} icon={<HomeOutlined />} >
                  <Link to="/Home">
                    <h3>Home</h3>
                  </Link>
                </Menu.Item>
                <Menu.SubMenu title="Common" icon={<AppstoreOutlined />}>
                  {/* <Menu.Item key="Cm009" style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }}>
                    <Link to="/Cm009">
                      <div>Issue Query for Outstanding Manifest Advice</div>
                    </Link>
                  </Menu.Item> */}
                  <Menu.Item key="Cm020" style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }}>
                    <Link to="/Cm020">
                      <div>Create Highlighting Critical Outstanding Manifest Cases</div>
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="Central Administration" icon={<AppstoreOutlined />}>
                  <Menu.Item key="Ca003Enquiry" style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }}>
                    <Link to="/Ca003Enquiry">
                      <div>Enquiry Schedules and Manifest for Probable Matching</div>
                    </Link>

                  </Menu.Item>
                  <Menu.Item key="Ca003EnquiryCED" style={{ whiteSpace: 'normal', height: 'auto', lineHeight: 'normal' }}>
                    <Link to="/Ca003EnquiryCED">
                      <div>Enquiry Schedules and Manifest for Probable Matching C&ED</div>
                    </Link>

                  </Menu.Item>

                </Menu.SubMenu>
              </Menu>

              <div className="SideMenu_last-login-title__3sFDd" style={{ color: 'white', padding: 10 }}>
                <small>Last successful login:<br /></small>
                <small>{new Date().toLocaleString()}</small>
              </div>

              <div className="SideMenu_last-login-title__3sFDd" style={{ display:'none', color: 'white', padding: 10 }}>
                <small>Switch User: {(isTsp)}<br /></small>
              </div>
              <Col span={8}>
                <Flex gap="small" justify='flex-end'>
                  <Button type="primary" onClick={() => onClickChangeUser(isTsp, setIsTsp)}>        Switch      </Button>
                </Flex>
              </Col>
            </Sider>
          }
          <Layout>
            <Header
              style={{
                padding: 0,
                background: "white",
                height: "130px"
              }}
            >
              <Row>
                <Col span={1}>
                  <Button onClick={() => { setCollapsed(!collapsed) }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>
                </Col>
                <Col span={23}>
                  {(window.location.pathname === '/') ? <HeaderNavs /> : <HeaderNavs />}
                </Col>
              </Row>



            </Header>
            <Content
              style={{
                margin: '0px 0px 0',
                padding: 10
              }}
            >
              <div
                style={{
                  minHeight: 360,
                  background: "white",
                  paddingBottom: 50
                }}
              >
                <UserContext.Provider value={{ isTsp, setIsTsp }}>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/CM009" element={<CM009 />} />
                    <Route path="/CM020" element={<CM020 />} />
                    <Route path="/CM020S3" element={<CM020S3 />} />
                    <Route path="/CA003Amend" element={<CA003Amend />} />
                    <Route path="/Ca003Enquiry" element={<Ca003Enquiry />} />
                    <Route path="/Ca003EnquiryCED" element={<Ca003EnquiryCED />} />
                    <Route path="/CA003New" element={<CA003New />} />
                    <Route path="/CA003View" element={<CA003View />} />
                    <Route path="*" element={<Login />} />
                  </Routes>
                </UserContext.Provider>

              </div>
            </Content>
            <Footer
              style={{ background: "white", textAlign: 'left', }}>
              <Row>
                <Col span={12}><Flex gap="small" justify='flex-start'>2024 © <Divider type="vertical" />
                  <a href='/'>Important Notices</a> <Divider type="vertical" />
                  <a href='/'>Access to Information</a> <Divider type="vertical" />
                  <a href='/'>Privacy Policy Statement</a></Flex></Col>
                <Col span={12}><Flex gap="small" justify='flex-end'>
                  <Image src='./logo-hongkong.c666c927.svg' width={100} preview={false} style={{ float: 'right' }} />
                </Flex></Col>
              </Row>
            </Footer>
          </Layout>
        </Layout>
    </Routers>
  )
}

export default App