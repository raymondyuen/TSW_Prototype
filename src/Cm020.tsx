import React, {useContext, useState} from 'react';
import {Alert, PopconfirmProps, TableColumnsType, TableProps, UploadProps} from 'antd';
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form, 
  Input,
  message,
  Popconfirm,
  Row,
  Table,
  Upload
} from 'antd';
import {useNavigate} from 'react-router-dom';
import {UserContext} from './IndexLayout';
import {ArrowDownOutlined, ArrowUpOutlined, HomeOutlined, UploadOutlined} from '@ant-design/icons';


const attrField = (field1: String, value1: String, field2?: String, value2?: String) => {
  if (value1 == "radio") return
  else return <Form.Item label={field1} name={field1 + ""} >
    <Input placeholder={field1 + ""} />
  </Form.Item>
}

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


const { RangePicker } = DatePicker;

const App: React.FC = () => {
  const [form] = Form.useForm();

  const userContextdetail = useContext(UserContext);

  if(!userContextdetail) {
    throw new Error("userContext is null or empty")
  }
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Array<DataType> | null>(null);
  const [targetDataSource, setTargetDataSource] = useState<Array<DataType> | null>(null);
  const [dateFrom, setDateFrom] = useState("May 2024");
  const [dateTo, setDateTo] = useState("Jun 2024");
  const {isTsp, setIsTsp} = userContextdetail;
  const [isSelcted, setIsSelected] = useState(false);
  const [showError, setShowError] = useState("none");
  const [isSelctedTar, setIsSelectedTar] = useState(false);
  const [showErrorTar, setShowErrorTar] = useState("none");

  form.setFieldsValue({ remark: `` });

  const onClickSearch = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      return;
    }
//form.getFieldsValue("period").period[0].$d
    if (form.getFieldValue("period") == '1') {
      setDateFrom("May 2024")
    } else {
      setDateFrom("June 2023")
    }
    console.log(form.getFieldValue("period"));
    debugger
    const data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
      key: i,
      carrierID: `963398` + i,
      companyName: "Chu Kong Agency Ltd" + i,
      idType: "BR",
      companyPhoneNo: '1234 5678',
      noOfCase: 2 + parseInt(i + "")
    }));
    setDataSource(data);
  }
  const onClickSelectTarget = () => {
    if (!isSelcted){
      setShowError("block");
      return;
    }
    setShowError("none")
    const data = Array.from({ length: 3 }).map<DataType>((_, i) => ({
      key: i,
      carrierID: `9633983` + i,
      companyName: "Chu Kong Agency Ltd" + i,
      idType: "BR",
      companyPhoneNo: '1234 5678',
      noOfCase: 2 + parseInt(i + "")
    }));
    setTargetDataSource(data);
  }
  const onClickDownload382 = () => {
    if (!isSelcted){
      setShowError("block");
      return;
    }
    setShowError("none")
    window.open("./Report_382.xlsx")
  }
  const onClickDownload383 = () => {
    if (!isSelcted){
      setShowError("block");
      return;
    }
    setShowError("none")
    window.open("./Report_383.xlsx")
  }
  const onClickDownload = () => {
    if (!isSelcted){
      setShowError("block");
      return;
    }
    setShowError("none")
    window.open("./download.csv")
  }
  const onClickUnSelect = () => {
    if (!isSelctedTar){
      setShowErrorTar("block");
      return;
    }
    setShowErrorTar("none")
    setTargetDataSource([]);
  }
  const onClickUpload = () => {
    const data = Array.from({ length: 14 }).map<DataType>((_, i) => ({
      key: i,
      carrierID: `9633983` + i,
      companyName: "Chu Kong Agency From Upload Ltd " + i,
      idType: "BR",
      companyPhoneNo: '9876 6655',
      noOfCase: 2 + parseInt(i + "")
    }));
    setDataSource(data);
  }

  const onClickPrint = () => {
    window.print();
  }
  const onClickSend = () => {
    navigate("/CM020S3");
  }

  type LayoutType = Parameters<typeof Form>[0]['layout'];
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };


  /**Table Function */
  interface DataType {
    key: React.Key;
    carrierID: string;
    companyName: string;
    idType: string;
    companyPhoneNo: string;
    noOfCase: number;

  }
  //Carrier ID	Company Name	ID Type	Company Phone No	No. of Cases	Action
  type OnChange = NonNullable<TableProps<DataType>['onChange']>;
  type Filters = Parameters<OnChange>[1];

  type GetSingle<T> = T extends (infer U)[] ? U : never;
  type Sorts = GetSingle<Parameters<OnChange>[2]>;
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Carrier ID',
      dataIndex: 'carrierID',
      sorter: (a, b) => a.carrierID.localeCompare(b.carrierID),
      // render: (text: string) => <a>{text}</a>,
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
      sorter: (a, b) => a.noOfCase - b.noOfCase,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Button onClick={onClickSend} type="primary" htmlType="submit">Send</Button>,
    },
  ];



  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (selectedRows.length>0){
        setIsSelected(true)
      }else{
        setIsSelected(false)
      }
    },
    getCheckboxProps: (record: DataType) => ({
      //disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //name: record.name,
    }),
  };
  const rowSelectionTar: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (selectedRows.length>0){
        setIsSelectedTar(true)
      }else{
        setIsSelectedTar(false)
      }
    },
    getCheckboxProps: (record: DataType) => ({
      //disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //name: record.name,
    }),
  };
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
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },
          {
            title: "Common Function",
          },
          {
            title: <a href="/Cm020">Select Companies with Critical Outstanding Manifest Advice Cases</a>,
          }
        ]}
      />
      <h1>Select Companies with Critical Outstanding Manifest Advice Cases</h1>

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
            {attrField('Carrier ID:', 'text')}
            <Form.Item name="checkbox-group" label="Transport Mode:">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                      Air
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B" style={{ lineHeight: '32px' }}>
                      Ocean
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C" style={{ lineHeight: '32px' }}>
                      River (RTV)
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D" style={{ lineHeight: '32px' }}>
                      River (Ferry)
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="checkbox-group" label="Matching Status:">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="AM" style={{ lineHeight: '32px' }}>
                      AM
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="PM" style={{ lineHeight: '32px' }}>
                      PM
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="CS" style={{ lineHeight: '32px' }}>
                      CS
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="NC" style={{ lineHeight: '32px' }}>
                      NC
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="OH" style={{ lineHeight: '32px' }}>
                      OH
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="UM" style={{ lineHeight: '32px' }}>
                      UM
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item name="checkbox-group" label="Schedule Status:">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="SE" style={{ lineHeight: '32px' }}>
                      SE
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="OS" style={{ lineHeight: '32px' }}>
                      OS
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="O1" style={{ lineHeight: '32px' }}>
                      O1
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="O2" style={{ lineHeight: '32px' }}>
                      O2
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="PD" style={{ lineHeight: '32px' }}>
                      PD
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="RF" style={{ lineHeight: '32px' }}>
                      RF
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="CL" style={{ lineHeight: '32px' }}>
                      CL
                    </Checkbox>
                  </Col>

                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="period" label="Period:" rules={[{ required: true }]}>
              <RangePicker placeholder={["YYYY-MM-DD", "YYYY-MM-DD"]} />
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


      <h3>List of Companies With Critical Outstanding Manifest Advice Cases</h3>
      <h5>Period: From {dateFrom} To {dateTo}</h5>
      <div style={{ display:showError}}>
        <Alert type="error" message="Please select at least one record" banner closable  />
      </div>
      {(isTsp === "TSP") ? <React.Fragment>
            <Table<DataType>
                rowSelection={{...rowSelection}}
                columns={columns}
                dataSource={dataSource != null ? dataSource : []}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `Total No. of Records = ${total}, displaying ${range[0]} to ${range[1]}`
                }}
                scroll={{y: 100 * 5}}
                onChange={handleChange}

            />
            <Divider/>
            <Row gutter={16}>
              <Col span={12}></Col>
              <Col span={12}><Flex gap="small" justify='flex-end'>
                <Popconfirm
                    title="Select As Target "
                    description="Are you sure to select As Target ?"
                    onConfirm={onClickSelectTarget}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                  <Button type="primary" htmlType="submit"> <ArrowDownOutlined />Select As Target </Button>
                </Popconfirm>
                <Button color="primary" variant="outlined" onClick={onClickDownload}>Download Selected Companies
                  List</Button>


              </Flex></Col>
            </Row>


            <h3>List of Targeted Companies</h3>
            <div style={{display: showErrorTar}}>
              <Alert type="error" message="Please select at least one record" banner closable/>
            </div>
            <Table<DataType>
                rowSelection={{...rowSelectionTar}}
                columns={columns.slice(0, -1)}
                dataSource={targetDataSource != null ? targetDataSource : []}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `Total No. of Records = ${total}, displaying ${range[0]} to ${range[1]}`
                }}
                scroll={{y: 100 * 5}}
                onChange={handleChange}
            />
            <Divider/>
            <Row gutter={16}>
              <Col span={12}></Col>
              <Col span={12}><Flex gap="small" justify='flex-end'>
                <Button type="primary" htmlType="submit" onClick={onClickUnSelect}> <ArrowUpOutlined />Un-select As Target </Button>
                <Popconfirm
                    title="Select As Target "
                    description="Are you sure to select As Target ?"
                    onConfirm={() => {
                      message.success('The companied you selected have been successfully saved into thetargeted list');
                    }}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                  <Button type="primary" htmlType="submit"> Save </Button>
                </Popconfirm>
              </Flex></Col>
            </Row>
          </React.Fragment>
          : <React.Fragment>
            <Table<DataType>
                rowSelection={{...rowSelection}}
                columns={columns}
                dataSource={dataSource != null ? dataSource : []}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `Total No. of Records = ${total}, displaying ${range[0]} to ${range[1]}`
            }}
            scroll={{ y: 100 * 5 }}
            onChange={handleChange}
          />
          <Divider />
          <Row gutter={16}>
            <Col span={12}></Col>
            <Col span={12}><Flex gap="small" justify='flex-end'>
              <Button color="primary" variant="outlined" onClick={onClickDownload}>Download Selected Companies List</Button>
              <Button color="primary" variant="outlined" onClick={onClickDownload382}>Generate Report #382</Button>
              <Button color="primary" variant="outlined" onClick={onClickDownload383}>Generate Report #383_1</Button>
              <Button color="primary" variant="outlined" onClick={onClickDownload383}>Generate Report #383_2</Button>
              <Button color="primary" variant="outlined" onClick={onClickDownload383}>Generate Report #383_3</Button>


            </Flex></Col>
          </Row>
        </React.Fragment>
      }
    </div>
  );
}
export default App;