import React from 'react';
import { Button, Space, DatePicker, version, Flex} from 'antd';
import { Typography } from 'antd';
import { Col, Row } from 'antd';
import { Input } from 'antd';

const {Title} = Typography
const {TextArea} = Input

const attrRow = (field1:String, value1:String, field2?:String, value2?:String) => {
  if(field2==undefined) return <Row gutter={16}>
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

const App = () => (
  <div style={{ padding: '0 24px' }}>
    <Title style={{color:'#1677ff'}}>Outstanding Manifest Advice</Title>
    {attrRow('Shipment Type','Inbound')}
    {attrRow('Date of Arrival / Departure','01/01/2024 11:11')}
    {attrRow('Transport Mode','AIR')}
    {attrRow('Flight No. / Vessel ID / Train No.','Flight No123455')}
    {attrRow('Vessel Name','')}
    {attrRow('Call Sign','')}
    {attrRow('Reply Due Date','06/02/2024')}
    {attrRow('Advice Status','Pending')}
    {attrRow('Lanuage Indicator','T - Traditional Chinese & English')}
    {attrRow('Carrier ID','CarrID123')}
    {attrRow('Carrier ID Type','')}
    {attrRow('Carrier Name','','Officer Name','C.Y')}
    {attrRow('Carrier Address 1','Addr 111111','Officer Title','Officer')}
    {attrRow('Carrier Address 2','Addr 222222','Officer Contact No.','27655556')}
    {attrRow('Carrier Address 3','Addr 333333','Office Name','Office 123')}
    {attrRow('Carrier Address 4','Addr 444444','Department Name','CCDDF')}
    <Title style={{color:'#1677ff'}}>Remarks</Title>
    <TextArea rows={6}></TextArea>
    <Flex gap="small" wrap style={{ padding: '24px 0' }} justify='flex-end'>
      <Button color="primary" variant="outlined">Convent to Simplified Chinese</Button>
      <Button color="primary" variant="outlined">Cancel</Button>
      <Button color="primary" variant="outlined">Reset</Button>
      <Button color="primary" variant="outlined">Print</Button>
      <Button color="primary" variant="outlined">Save</Button>
    </Flex>
    
  </div>
);

export default App;