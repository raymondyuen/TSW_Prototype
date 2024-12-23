import React from 'react';
import type {PopconfirmProps} from 'antd';
import {Breadcrumb, Button, Col, Flex, Form, Input, message, Popconfirm, Row, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';

const { Title } = Typography
const { TextArea } = Input

const attrRow = (field1: String, value1: String, field2?: String, value2?: String) => {
  if (field2 == undefined) return <Row gutter={16}>
    <Col span={6} className='field'>{field1}</Col>
    <Col span={6} className='value'>{value1}</Col>
  </Row>
  else return <Row gutter={16}>
    <Col span={6} className='field'>{field1}</Col>
    <Col span={6} className='value'>{value1}</Col>
    <Col span={6} className='field'>{field2}</Col>
    <Col span={6} className='value'>{value2}</Col>
  </Row>
}
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const onFinish = (values: any) => {
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const confirm: PopconfirmProps['onConfirm'] = (e) => {
  onFinish("");
  message.success('The Outstanding Manifest Advice is saved.');
  console.log(e);
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  //message.error('The Outstanding Manifest Advice is saved.');
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    remark: `According to Regulations 11 12 of the Import and Export			
Under the Import and Export (Registration) Regulations, Chapter 60E, 			
of the Laws of Hong Kong, every person who imports or exports/ re-exports 			
any article other than an exempted article is required to lodge with the Commissioner			
of Customs and Excise an accurate and complete import/export declaration within 			
14 days after the importation or exportation of the article.			
			
According to regulations 11 and 12 of the Import and Export			
(Registration) Regulations, Chapter 60, Laws of Hong Kong, the owner			
of master  of the vessel, or the owner of commander of the aircraft or			
the person acting as the agent for the owner of goods carried by			
train shall lodge with the Commissioner of Customs and Excise a			
			
The powers and duties exercised by the issuing officer under the 			
Import and Export (Registation) Regulations are authorized by the			
Commissioner of Custom and Excise in accordance with Section 4 of 			
the Import and Export Ordinance (Cap.60) and Section 43(1) of the 			
Interpretation and General Clauses Ordinance (Cap.1).			
			
"本條例旨在對在香港輸入和輸出物品，對已經輸入香港或可能輸出香港的物品在香港境內的處理及運載，以及對任何附帶引起或與前述事項相關的事宜，作出規 ...根據本條例發出的牌照或許可證的持有人及其受僱人或代理人，
須提供香港海關人員所要求的必需途徑，
以使香港海關人員能夠就該持牌人或持證人現時或曾經管有…."			
` });
  const onClickPrint = () => {
    window.print();
  }

  const navigate = useNavigate();
  
  return (

    <div style={{ padding: '0 24px' }}>
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },
          {
            title: "Common Function",
          },
          {
            title: <a href="/Cm009">Outstanding Manifest Advice</a>,
          }
        ]}
      />
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 1200 }}
        validateMessages={validateMessages}
      >
        <h1>Outstanding Manifest Advice</h1>
        {attrRow('Shipment Type', 'Inbound')}
        {attrRow('Date of Arrival / Departure', '01/01/2024 11:11')}
        {attrRow('Transport Mode', 'AIR')}
        {attrRow('Flight No. / Vessel ID / Train No.', 'Flight No123455')}
        {attrRow('Vessel Name', '')}
        {attrRow('Call Sign', '')}
        {attrRow('Reply Due Date', '06/02/2024')}
        {attrRow('Advice Status', 'Pending')}
        {attrRow('Lanuage Indicator', 'T - Traditional Chinese & English')}
        {attrRow('Carrier ID', 'X3338876')}
        {attrRow('Carrier ID Type', 'HKID')}
        {attrRow('Carrier Name', 'Chan Tai Man', 'Officer Name', 'C.Y')}
        {attrRow('Carrier Address 1', 'KING CHAN HO BUILDING', 'Officer Title', 'Officer')}
        {attrRow('Carrier Address 2', '41 - 200 ADCEG STREET', 'Officer Contact No.', '27655556')}
        {attrRow('Carrier Address 3', 'CENTRAL AND WESTERN DISTRICT', 'Office Name', 'Office 123')}
        {attrRow('Carrier Address 4', 'HONG KONG', 'Department Name', 'C&SD')}
        <h3>Remarks</h3>
        <Form.Item name="remark" label="Remarks" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 8 }} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}><Flex gap="small" justify='flex-start'><Button color="primary" variant="outlined" onClick={() => navigate(-1)}>Back</Button></Flex></Col>
          <Col span={12}><Flex gap="small" justify='flex-end'>
            <Button color="primary" variant="outlined" disabled>Convent to Simplified Chinese</Button>
            <Button color="primary" variant="outlined" onClick={onClickPrint}>Print</Button>
            <Button color="primary" variant="outlined" >Reset</Button>

            <Popconfirm
              title="Outstanding Manifest Advice"
              description="Are you sure to save the Outstanding Manifest Advice?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >

              <Button type="primary" htmlType="submit">        Save      </Button>
            </Popconfirm>
          </Flex></Col>
        </Row>

      </Form>
    </div>
  );
}
export default App;