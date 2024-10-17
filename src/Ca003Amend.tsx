import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    GetProps,
    Typography,
    Row,
    Col,
    Space,
    DatePickerProps,
    TimePickerProps, TimePicker, SelectProps, Tooltip, ConfigProvider, Flex,
} from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const {Title} = Typography
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// date picker
const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

// time picker
dayjs.extend(customParseFormat);

const onChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
    console.log(time, timeString);
};



// select input field
interface ItemProps {
    label: string;
    value: string;
}

const options: ItemProps[] = [];

for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
        label: `Long Label: ${value}`,
        value,
    });
}

const sharedProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options,
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
};

const App: React.FC = () => {
    const [airMode, setAirMode] = useState<boolean>(false)
    const [OceanAndRiverMode, setOceanAndRiverMode] = useState<boolean>(false)
    const [railMode, setRailMode] = useState<boolean>(false)
    // input field
    const [value, setValue] = useState(['Vehicle No. 535', 'Vehicle No. 536', 'Vehicle No. 537', 'Vehicle No. 539', 'Vehicle No. 538']);
    const selectProps: SelectProps = {
        value,
        onChange: setValue,
    };
    // remarks value

    // button
    const navigate = useNavigate()
    const toPreviousPage = ()=>{ 
        navigate('/Ca003Enquiry',{replace: true})
    }

    return (
      <div style={{padding: '0 24px', maxWidth: 1800}}>
          <Form
            labelCol={{flex: '110px'}}
            wrapperCol={{flex: 1}}
            labelAlign="left"
            labelWrap
            layout="horizontal"
            colon={false}
            style={{
                width:1600,
                maxWidth: 1800,
            }}
          >
           
              <Title level={1}  style={{color: '#1677ff'}}>
              Create / Amend Schedule
              </Title>
              <Row>
                  <Col span={8}>
                      <Form.Item label="Transport Mode:" labelCol={{ span: 12 }}  style={{ width: '500px' }} >
                          <Select>
                              <Select.Option value="Air">Air</Select.Option>
                              <Select.Option value="Ocean">Ocean</Select.Option>
                              <Select.Option value="Rail">Rail</Select.Option>
                          </Select>
                      </Form.Item>
                  </Col>
                  <Col span={9}>
                      <Form.Item label="Shipment Type:" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Select>
                              <Select.Option value="Inbound">Inbound</Select.Option>
                              <Select.Option value="Outbound">Outbound</Select.Option>
                          </Select>
                      </Form.Item>
                  </Col>

                  <Col span={8}>
                      <Form.Item label="Estimated Date of Arrival / Departure" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Space direction="vertical">
                              <DatePicker onChange={onChangeDate}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Matching Status" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input value="Schedule Probable-Match" disabled={true}></Input>
                      </Form.Item>
                  </Col>
                  <Col span={17}>
                      <Form.Item label="Estimated time of Arrival / Departure" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Space direction="vertical">
                              <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Actual Date of Arrival / Departure" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Space direction="vertical">
                              <DatePicker onChange={onChangeDate}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Matched UMR" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={17}>
                      <Form.Item label="Actual Time of Arrival / Departure" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Space direction="vertical">
                              <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Scheduled Date of Arrival / Departure" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Space direction="vertical">
                              <DatePicker onChange={onChangeDate}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Mark Deny By" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={17}>
                      <Form.Item label="Scheduled Time of Arrival / Departure" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Space direction="vertical">
                              <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Schedule Pending" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="OS Manifest Ref No." labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input.TextArea allowClear/>
                      </Form.Item>
                  </Col>
              </Row>

              <h1 style={{color: '#1677ff'}}>Carrier Information</h1>
              <Row gutter={[16, 16]}>
                  <Col span={8}>
                      <Form.Item label="Carrier ID" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={9}>
                      <Form.Item label="Carrier ID Type" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Select options={[
                              {value: "HK Business Reg", label: "HK Business Reg"},
                          ]}/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Carrier Number" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Carrier Address" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input.TextArea allowClear/>
                      </Form.Item>
                  </Col>
              </Row>
              <Col span={8}>
                  <Form.Item label="Carrier Phone Number" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                      <Input></Input>
                  </Form.Item>
              </Col>
              <Col span={8}>
                  <Form.Item label="Carrier Code (MD)" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                      <Input/>
                  </Form.Item>
              </Col>
              <Col span={8}>
                  <Form.Item label="Carrier Code (AA)" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                      <Input/>
                  </Form.Item>
              </Col>
              <Col span={8}>
                  <Form.Item label="Carrier Code (KCRC)" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                      <Input/>
                  </Form.Item>
              </Col>

              <Title level={1}  style={{color: '#1677ff'}}>
                  Ocean / River Information
              </Title>
              <Row gutter={[16, 16]}>
                  <Col span={8}>
                      <Form.Item label="Vessel ID" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Call Sign" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input disabled={true} value="CY8CS81"></Input>
                      </Form.Item>
                  </Col>
              </Row>
              <Col span={8}>
                  <Form.Item label="Vessel Name" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                      <Input disabled={true} value='UHIHIJ'></Input>
                  </Form.Item>
              </Col>

              <Title style={{color: '#1677ff'}}>
                  Flight Information
              </Title>
              <Row gutter={[16, 16]}>
                  <Col span={8}>
                      <Form.Item label="Flight ID" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input value="Flight 545" disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Flight ID (Matching)" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input value="Flight 545" disabled={true}></Input>
                      </Form.Item>
                  </Col>
              </Row>
              <Col span={8}>
                  <Form.Item label="Service Type" labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                      <Select options={[
                          {value: "HK Business Reg", label: "HK Business Reg"},
                      ]}/>
                  </Form.Item>
              </Col>

              <Title style={{color: '#1677ff'}}>
              Rail Information
              </Title>
              <Row gutter={[16, 16]}>
                  <Col span={8}>
                      <Form.Item label="Train No." labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input value="Train No. 535" disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={9}>
                      <Form.Item label="Wagon No." labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Select {...sharedProps} {...selectProps} />
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Mainland Train No." labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="New Wagon No." labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <Select {...sharedProps} {...selectProps} />
                      </Form.Item>
                  </Col>
              </Row>

              <Title style={{color: '#1677ff'}}>
              Road Information
              </Title>              
              <Row gutter={[16, 16]}>
                  <Col span={8}>
                      <Form.Item label="Vehicle Reference No." labelCol={{ span: 12 }}  style={{ width: '500px' }}>
                          <Input value="Vehicle No. 535" disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                      <Form.Item label="Remarks" labelCol={{ span: 8 }}  style={{ width: '500px' }}>
                          <div style={{margin: '24px 0'}}/>
                          <TextArea
                            placeholder="Controlled autosize"
                            autoSize={{minRows: 3, maxRows: 5}}
                          />
                      </Form.Item>
                  </Col>
              </Row>
              <Row>
                  {/* empty line make the button to right */}
                  <Col span={8}></Col>
                  <Col span={8} offset={8}>
                      <ConfigProvider componentSize={'middle'}>
                          <Flex vertical gap='middle'>
                              <Flex gap="middle" wrap>
                                  <Button color="primary" variant="outlined" onClick={toPreviousPage}>
                                      Back
                                  </Button>
                                  <Button color="primary" variant="outlined">
                                      Reset
                                  </Button>
                                  <Button color="primary" variant="outlined">
                                      Print
                                  </Button>
                                  <Button color="danger" variant="solid">
                                      Save
                                  </Button>
                              </Flex>
                          </Flex>
                      </ConfigProvider>
                  </Col>
              </Row>
          </Form>
      </div>
    );
};

export default App;