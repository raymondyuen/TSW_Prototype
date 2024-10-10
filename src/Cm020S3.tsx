import React, { useState } from 'react';
import { DatePicker, version, Flex } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import { getDefaultFormatCodeSettings } from 'typescript';
import { message, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from 'antd';
import { Divider, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useEffect } from "react";

const { Title } = Typography
const { TextArea } = Input

const attrRow = (field1: String, value1: String, field2?: String, value2?: String) => {
  if (value1 == "undefined") return <Row gutter={16}>
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

const attrField = (field1: String, value1: String, field2?: String, value2?: String) => {
  if (value1 == "radio") return
  else return <Form.Item label={field1} name={field1 + ""} rules={[{ required: true }]}>
    <Input placeholder={field1 + ""} />
  </Form.Item>
}
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const onFinish = (values: any) => {
  message.success('The Outstanding Manifest Advice is saved.');
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
  console.log(e);
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  //message.error('The Outstanding Manifest Advice is saved.');
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Array<DataType> | null>(null);

  form.setFieldsValue({ remark: `` });



  const onClickPrint = () => {
    window.print();
  }
  const onClickConvert = () => {
    message.error('Not Support');
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  type LayoutType = Parameters<typeof Form>[0]['layout'];
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };


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
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Transport Mode',
      dataIndex: 'tranMode',
    },
    {
      title: 'Voyage / Flight / Train / Vehicle No.',
      dataIndex: 'vid',
    },
    {
      title: 'Shipment Date',
      dataIndex: 'shipmentDt',
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


  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      //disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  /**End Table */

  useEffect(() => {
    const data = Array.from({ length: 3 }).map<DataType>((_, i) => ({
      key: i,
      omaRefNo: `OMA-12345678`,
      tranMode: "Air ",
      vid: "UX001",
      shipmentDt: '15/05/2009',
      omaType: "OS1",
      omaStatus:"New"
    }));
    setDataSource(data);
  })

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
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={dataSource != null ? dataSource : []}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 100 * 5 }}
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