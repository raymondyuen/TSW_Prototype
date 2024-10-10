import React, { } from 'react';
import { Flex } from 'antd';

import { message, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import {
  Button,

  Col,

  Form,

  Row,

} from 'antd';
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';

import { useEffect } from "react";


const attrRow = (field1: String, value1: String, field2?: String, value2?: String) => {
  if (value1 === "undefined") return <Row gutter={16}>
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


const onFinish = (values: any) => {
  message.success('The Outstanding Manifest Advice is saved.');
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  onFinish("");
  console.log(e);
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  //message.error('The Outstanding Manifest Advice is saved.');
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  form.setFieldsValue({ remark: `` });



  const onClickPrint = () => {
    window.print();
  }




  /**Table Function */
  interface DataType {
    key: React.Key;
    omaRefNo: string;
    tranMode: string;
    vid: string;
    shipmentDt: string;
    omaType: string;
    omaStatus: string;

  }
  //Carrier ID	Company Name	ID Type	Company Phone No	No. of Cases	Action

  const columns: TableColumnsType<DataType> = [
    {
      title: 'OMA Refer No.',
      dataIndex: 'omaRefNo',
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Transport Mode',
      dataIndex: 'tranMode',sorter: true,
    },
    {
      title: 'Voyage / Flight / Train / Vehicle No.',
      dataIndex: 'vid',sorter: true,
    },
    {
      title: 'Shipment Date',
      dataIndex: 'shipmentDt',
      sorter: true,
    },
    {
      title: 'OMA Type',
      dataIndex: 'omaType',
    },
    {
      title: 'OMA Status',
      dataIndex: 'omaStatus',

    },
  ];

  /**End Table */

  useEffect(() => {

  })
  const data = [
    {
      key: 1,
      omaRefNo: `OMA-12345678`,
      tranMode: "Air ",
      vid: "UX001",
      shipmentDt: '15/05/2024',
      omaType: "OS1",
      omaStatus: "New"
    },
    {
      key: 2,
      omaRefNo: `OMA-12345303`,
      tranMode: "Ocean ",
      vid: "V776653-093",
      shipmentDt: '13/05/2024',
      omaType: "OS2",
      omaStatus: "Response Submitted"
    },
 
  ]
  return (

    <div style={{ padding: '0 24px', maxWidth: 1200 }}>
      <Menu />

      <h1 style={{ color: '#1677ff' }}>Send Notice To Company With Critical Outstanding Manifest Advice</h1>
      {attrRow('Carrier ID', '000-8765457')}
      {attrRow('Company Name', 'Chu Kong Agency Ltd')}
      {attrRow('Contact Email', 'carrier_001@email.com')}
      {attrRow('Contact Fax', '12324354')}



      <Divider />

      <Table<DataType>
        columns={columns}
        dataSource={data != null ? data : []}
       // pagination={{ pageSize: 10 }}
        pagination={{ position: [] }}

      />
      <Divider />
      <Row gutter={16}>
        <Col span={12}><Flex gap="small" justify='flex-start'><Button color="primary" variant="outlined" onClick={() => navigate(-1)}>Back</Button></Flex></Col>
        <Col span={12}><Flex gap="small" justify='flex-end'>
          <Popconfirm
            title="Select As Target "
            description="Are you sure to Select As Target ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" htmlType="submit">        Preview Notice     </Button>
          </Popconfirm>
          <Button color="primary" variant="outlined" onClick={onClickPrint}>Issue via Email</Button>
          <Button color="primary" variant="outlined" onClick={onClickPrint}>Issue via Fax</Button>


        </Flex></Col>
      </Row>


    </div>
  );
}
export default App;