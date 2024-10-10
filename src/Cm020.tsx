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

  form.setFieldsValue({remark: `` });

  const onClickSearch = ()=>{
    const data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
      key: i,
      carrierID:`000-8765457-`+i,
      companyName: "Chu Kong Agency Ltd"+i,
      idType:  "BR",
      companyPhoneNo: '1234 5678',
      noOfCase:2
    }));
    setDataSource(data);
  }
  const onClickUpload = ()=>{
    const data = Array.from({ length: 3 }).map<DataType>((_, i) => ({
      key: i,
      carrierID:`000-8765457-`+i,
      companyName: "Chu Kong Agency From Upload Ltd "+i,
      idType:  "BR",
      companyPhoneNo: '9876 6655',
      noOfCase:2
    }));
    setDataSource(data);
  }

  const onClickPrint = () => {
    window.print();
  }
  const onClickSend = () =>{
    navigate("/CM020S3");
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
    carrierID:string;
    companyName: string;
    idType: string;
    companyPhoneNo: string;
    noOfCase: number;

  }
    //Carrier ID	Company Name	ID Type	Company Phone No	No. of Cases	Action

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Carrier ID',
      dataIndex: 'carrierID',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
    },
    {
      title: 'ID Type',
      dataIndex: 'idType',
    },
    {
      title: 'Company Phone No.',
      dataIndex: 'companyPhoneNo',
    },
    {
      title: 'No. of Cases',
      dataIndex: 'noOfCase',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Button onClick={onClickSend}>Send</Button>,
    },
  ];

  // let data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  //   key: i,
  //   carrierID:`000-8765457-`+i,
  //   companyName: "Chu Kong Agency Ltd"+i,
  //   idType:  "BR",
  //   companyPhoneNo: '1234 5678',
  //   noOfCase:2
  // }));
  //setDataSource(data);
  // rowSelection object indicates the need for row selection
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

  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (

    <div style={{ padding: '0 24px' }}>
      <Menu />

      <h1 style={{ color: '#1677ff' }}>Create Highlighting Critical Outstanding Manifest Cases</h1>

      <Row>
        <Col span={8}>
          <Form
            form={form}
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            onValuesChange={onFormLayoutChange}
            style={{ maxWidth: formLayout === 'inline' ? 'none' : 1200 }}
            validateMessages={validateMessages}
          >
            {attrField('Carrier ID', 'text')}
            <Form.Item name="checkbox-group" label="OMA Status" rules={[{ required: true }]}>
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                      OMA
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B" style={{ lineHeight: '32px' }}>
                      OS1
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C" style={{ lineHeight: '32px' }}>
                      OS2
                    </Checkbox>
                  </Col>

                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Period" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="apple"> Monthly </Radio>
                <Radio value="pear"> Annually </Radio>
              </Radio.Group>
            </Form.Item>
            <Col span={24}>
              <Flex gap="small" justify='flex-end'>
                <Button type="primary" htmlType="submit" onClick={onClickSearch}>        Search      </Button>
              </Flex>
            </Col>
          </Form>
        </Col>
        <Col span={2}></Col>
        <Col span={8}>
          <Row> Upload File : </Row>
          <Upload {...props}>
    <Button icon={<UploadOutlined />}>Choose File</Button>
  </Upload>
          <Col span={24}>
              <Flex gap="small" justify='flex-end'>
                <Button type="primary" htmlType="submit" onClick={onClickUpload}>        Upload      </Button>
              </Flex>
            </Col>
        </Col>


      </Row>

      <Divider />
      <h3 style={{ color: '#1677ff' }}>List of Companies With Critical Outstanding Manifest Advice Cases</h3>
      <h5>Period: From May 2009 To Jun 2009</h5>
    
      <Table<DataType>
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns} 
        dataSource={dataSource != null ? dataSource:[]}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 100 * 5 }}
      />
      <Divider />
      <Row gutter={16}>
        <Col span={12}></Col>
        <Col span={12}><Flex gap="small" justify='flex-end'>
        <Popconfirm
            title="Select As Target "
            description="Are you sure to Select As Target ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" htmlType="submit">        Select As Target      </Button>
          </Popconfirm>
          <Button color="primary" variant="outlined" onClick={onClickPrint}>Download Selected Companies List</Button>

         
        </Flex></Col>
      </Row>


    </div>
  );
}
export default App;