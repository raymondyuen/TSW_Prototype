import React, {useEffect, useState} from 'react';
import {Input, PopconfirmProps, TableColumnsType} from 'antd';
import {Button, Col, Divider, Flex, Form, message, Popconfirm, Row, Table} from 'antd';
import {useNavigate} from 'react-router-dom';


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

const onClickPreview = (values: any) => {
  window.open("./Sample of OMA by Fax.pdf")
  //message.success('The Outstanding Manifest Advice is saved.');
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  console.log(e);
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  //message.error('The Outstanding Manifest Advice is saved.');
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  form.setFieldsValue({ remark: `` });



  const onClickIssueEmail = () => {
    message.success("Issue successful")
    //window.print();
  }
  const onClickIssueFax = () => {
    message.success("Issue successful")
    //window.print();
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
    sendDate:string;
    sendMethod:string;

  }
  //Carrier ID	Company Name	ID Type	Company Phone No	No. of Cases	Action

  const columns: TableColumnsType<DataType> = [
    {
      title: 'OMA Refer No.',
      dataIndex: 'omaRefNo',
      width:"150px"
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Transport Mode',
      dataIndex: 'tranMode', sorter: true,
      width:"150px"
    },
    {
      title: 'Voyage ID / Flight ID',
      dataIndex: 'vid', sorter: true,
      width:"150px"
    },
    {
      title: 'Shipment Date',
      dataIndex: 'shipmentDt',
      sorter: true,
      width:"150px"
    },
    {
      title: 'OMA Type',
      dataIndex: 'omaType',
      width:"150px"
    },
    {
      title: 'OMA Status',
      dataIndex: 'omaStatus',
      width:"150px"
    },
    {
      title: 'Issue Date',
      dataIndex: 'sendDate',
      width:"150px"
    },
    {
      title: 'Issue Channel',
      dataIndex: 'sendMethod',
      width:"150px"

    },
  ];

  /**End Table */

  useEffect(() => {

  })
  const data = [
    {
      key: 1,
      omaRefNo: `S-A0-401-018112`,
      tranMode: "River",
      vid: "20231233897 (HEI BANG EA 776/98443)",
      shipmentDt: '15/05/2024',
      omaType: "OS1",
      omaStatus: "New",
      sendDate: "2024-11-27",
      sendMethod: "Email"
    },
    {
      key: 2,
      omaRefNo: `S-A0-401-018278`,
      tranMode: "River",
      vid: "20231233896 (HEI BANG EA 776/98776)",
      shipmentDt: '13/05/2024',
      omaType: "OS2",
      omaStatus: "Response Submitted",
      sendDate: "2024-11-27",
      sendMethod: "Fax"
    },

  ]
  return (

    <div style={{ padding: '0 24px', maxWidth: 1200 }}>
      <h1 style={{ color: '#1677ff' }}>Send Notice To Company With Critical Outstanding Manifest Advice</h1>
      {attrRow('Carrier ID', '000-8765457')}
      {attrRow('Company Name', 'Chu Kong Agency Ltd')}
      {attrRow('Contact Email', 'carrier_001@email.com')}
      {attrRow('Contact Fax', '12324354')}

      <h3>Issue Notice</h3>
      <Form
          form={form}
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 1200 }}
      >
        <Row>
          <Col span={8}>
            <Form.Item label="Email Address:" labelCol={{ span: 8 }}>
              <Input  />
            </Form.Item>
          </Col>
          <Col  style={{paddingLeft:'10px'}}>
            <Button color="primary" variant="solid" onClick={onClickIssueEmail}>Issue Email</Button>
          </Col>
          <Col span={8} style={{paddingLeft:'10px'}}>
            <Form.Item label="Fax No." labelCol={{ span: 8 }}>
              <Input  />
            </Form.Item>
          </Col>
          <Col  style={{paddingLeft:'10px'}}>
            <Button color="primary" variant="solid" onClick={onClickIssueFax}>Issue Fax</Button>
          </Col>
        </Row>
      </Form>




      <Divider />
      <h3>Outstanding Manifest Advice List</h3>
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
            description="Are you sure?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
          </Popconfirm>
          <Button type="primary" htmlType="submit" onClick={onClickPreview}>Preview Notice</Button>



        </Flex></Col>
      </Row>


    </div>
  );
}
export default App;