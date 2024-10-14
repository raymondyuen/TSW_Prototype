import React, { useState } from 'react';
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
import Menu from "./Menu";

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

    return (
      <div style={{padding: '0 24px', maxWidth: 1200}}>
          <Menu/>
          <Form
            labelCol={{flex: '110px'}}
            wrapperCol={{flex: 1}}
            labelAlign="left"
            labelWrap
            layout="horizontal"
            colon={false}
            style={{
                maxWidth: 8000,
            }}
          >
              <h1 style={{color: '#1677ff'}}>Create / Amend Schedule</h1>
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                      <Form.Item label="Transport Mode:">
                          <Select>
                              <Select.Option value="Air">Air</Select.Option>
                              <Select.Option value="Ocean">Ocean</Select.Option>
                              <Select.Option value="Rail">Rail</Select.Option>
                          </Select>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Shipment Type:">
                          <Select>
                              <Select.Option value="Inbound">Inbound</Select.Option>
                              <Select.Option value="Outbound">Outbound</Select.Option>
                          </Select>
                      </Form.Item>
                  </Col>

                  <Col span={12}>
                      <Form.Item label="Estimated Date of Arrival / Departure">
                          <Space direction="vertical">
                              <DatePicker onChange={onChangeDate}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Matching Status">
                          <Input value="Schedule Probable-Match" disabled={true}></Input>
                      </Form.Item>
                  </Col>
                  <Col span={17}>
                      <Form.Item label="Estimated time of Arrival / Departure">
                          <Space direction="vertical">
                              <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Actual Date of Arrival / Departure">
                          <Space direction="vertical">
                              <DatePicker onChange={onChangeDate}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Matched UMR">
                          <Input disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={17}>
                      <Form.Item label="Actual Time of Arrival / Departure">
                          <Space direction="vertical">
                              <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Scheduled Date of Arrival / Departure">
                          <Space direction="vertical">
                              <DatePicker onChange={onChangeDate}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Mark Deny By">
                          <Input disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={17}>
                      <Form.Item label="Scheduled Time of Arrival / Departure">
                          <Space direction="vertical">
                              <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}/>
                          </Space>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Schedule Pending">
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="OS Manifest Ref No.">
                          <Input.TextArea allowClear/>
                      </Form.Item>
                  </Col>
              </Row>

              <h1 style={{color: '#1677ff'}}>Carrier Information</h1>
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                      <Form.Item label="Carrier ID">
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Carrier ID Type">
                          <Select options={[
                              {value: "HK Business Reg", label: "HK Business Reg"},
                          ]}/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Carrier Number">
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Carrier Address">
                          <Input.TextArea allowClear/>
                      </Form.Item>
                  </Col>
              </Row>
              <Col span={12}>
                  <Form.Item label="Carrier Phone Number">
                      <Input></Input>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item label="Carrier Code (MD)">
                      <Input/>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item label="Carrier Code (AA)">
                      <Input/>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item label="Carrier Code (KCRC)">
                      <Input/>
                  </Form.Item>
              </Col>

              <Title style={{color: '#1677ff'}}>
                  Ocean / River Information
              </Title>
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                      <Form.Item label="Vessel ID">
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Call Sign">
                          <Input disabled={true} value="CY8CS81"></Input>
                      </Form.Item>
                  </Col>
              </Row>
              <Col span={12}>
                  <Form.Item label="Vessel Name">
                      <Input disabled={true} value='UHIHIJ'></Input>
                  </Form.Item>
              </Col>

              <Title style={{color: '#1677ff'}}>
                  Flight Information
              </Title>
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                      <Form.Item label="Flight ID">
                          <Input value="Flight 545" disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Flight ID (Matching)">
                          <Input value="Flight 545" disabled={true}></Input>
                      </Form.Item>
                  </Col>
              </Row>
              <Col span={12}>
                  <Form.Item label="Service Type">
                      <Select options={[
                          {value: "HK Business Reg", label: "HK Business Reg"},
                      ]}/>
                  </Form.Item>
              </Col>

              <h1 style={{color: '#1677ff'}}>Rail Information</h1>
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                      <Form.Item label="Train No.">
                          <Input value="Train No. 535" disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Wagon No.">
                          <Select {...sharedProps} {...selectProps} />
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Mainland Train No.">
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="New Wagon No.">
                          <Select {...sharedProps} {...selectProps} />
                      </Form.Item>
                  </Col>
              </Row>

              <h1 style={{color: '#1677ff'}}>Road Information</h1>
              <Row gutter={[16, 16]}>
                  <Col span={12}>
                      <Form.Item label="Vehicle Reference No.">
                          <Input value="Vehicle No. 535" disabled={true}/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Remarks">
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
                                  <Button color="primary" variant="outlined">
                                      Cancel
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