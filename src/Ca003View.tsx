import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    Breadcrumb,
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
    Card,
    Popconfirm,
    Divider,
} from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const { Title } = Typography
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
    const onClickPreviewDetail = () => {
        window.open("./schPrintDetails.html")
    }
    // button
    const navigate = useNavigate()
    const toPreviousPage = () => {
        navigate('/Ca003Enquiry', { replace: true })
    }
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
    return (
        <div style={{ padding: '0 24px', maxWidth: 1800 }}>
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: <a href="/Ca003Enquiry">Enquiry of Schedules and Manifest for Probable Matching</a>,
                    },
                    {
                        title: 'Schedule Details'
                    },
                ]}
            />
            <Form
                labelCol={{ flex: '110px' }}
                wrapperCol={{ flex: 1 }}
                labelAlign="left"
                labelWrap
                layout="horizontal"
                colon={false}
                style={{
                    width: 1200,
                    maxWidth: 1800,
                }}
            >

                <h1>
                    Schedule Details
                </h1>
                <Card title='Schedule Infomartion' headStyle={{ backgroundColor: '#1677ff', color: '#ffffff' }}>
                    {attrRow('Transport Mode:', 'Air','Shipment Type:', 'Inbound')}
                    {attrRow('Estimated Date of Arrival / Departure', '2024-05-20','Matching Status', 'Schedule Probable-Match')}
                    {attrRow('Estimated time of Arrival / Departure', '01:00')}
                    {attrRow('Actual Date of Arrival / Departure', '2024-05-20', 'Matched UMR' , '-')}
                    {attrRow('Actual Time of Arrival / Departure', '01:00')}
                    {attrRow('Scheduled Date of Arrival / Departure ', '2024-05-20', 'Mark Deny By' , '-' )}
                    {attrRow('Scheduled Time of Arrival / Departure ', '01:00')}
                    {attrRow('Schedule Pending', '-', 'OS Manifest Ref No.' , '-')}


                </Card>
                <Card title='Carrier Infomartion' style={{ minWidth: '800px' }} headStyle={{ backgroundColor: '#1677ff', color: '#ffffff' }}>
                    {attrRow('Carrier Name:', 'CRT-Carrier','', '')}
                    {attrRow('Carrier ID:', '333333','Carrier ID Type:', 'BR')}
                    {attrRow('Carrier Phone', '2256 2258','Carrier Address', 'Yau Tsim Mong District, Island Harbourview')}
                    {attrRow('Carrier Code (MD)', '-','', '')}
                    {attrRow('Carrier Code (AA)', '-','', '')}
                    {attrRow('Carrier (KCRC)', '-','', '')}

                </Card>

                <Card title=' Ocean / River Information' style={{ minWidth: '800px' , display:'none'}} headStyle={{ backgroundColor: '#1677ff', color: '#ffffff' }}>
                    {attrRow('Vessel ID:', '-','Call Sign', '-')}
                    {attrRow('Vessel Name:', '-','', '')}

                </Card>

                <Card title='Flight Information' style={{ minWidth: '800px' }} headStyle={{ backgroundColor: '#1677ff', color: '#ffffff' }}>
                    {attrRow('Flight ID:', 'CX886','Flight ID (Matching)', 'CX886')}
                    {attrRow('Service Type:', 'HK Business Reg','', '')}

                </Card>

                <Card title='Rail Information' style={{ minWidth: '800px' , display:'none'}} headStyle={{  backgroundColor: '#1677ff', color: '#ffffff' }}>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item label="Train No." labelCol={{ span: 12 }} style={{ width: '500px' }}>
                                <Input value="" disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Wagon No." labelCol={{ span: 8 }} style={{ width: '500px' }}>
                                <Select disabled  />
                                {/* <Select {...sharedProps} {...selectProps} disabled  /> */}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mainland Train No." labelCol={{ span: 8 }} style={{ width: '500px' }}>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="New Wagon No." labelCol={{ span: 8 }} style={{ width: '500px' }}>
                                <Select disabled  />
                                {/* <Select {...sharedProps} {...selectProps} /> */}
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card title='Road Information' style={{ minWidth: '800px', display:'none' }} headStyle={{ backgroundColor: '#1677ff', color: '#ffffff' }}>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item label="Vehicle Reference No." labelCol={{ span: 12 }} style={{ width: '500px' }}>
                                <Input value="" disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Remarks" labelCol={{ span: 8 }} style={{ width: '500px' }}>
                                <div style={{ margin: '24px 0' }} />
                                <TextArea 
                                    placeholder="Controlled autosize"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Divider />
                <Row gutter={16}>
                    <Col span={12}><Flex gap="small" justify='flex-start'><Button color="primary" variant="outlined" onClick={() => navigate(-1)}>Back</Button></Flex></Col>
                    <Col span={12}><Flex gap="small" justify='flex-end'>
                        <Popconfirm
                            title="Select As Target "
                            description="Are you sure?"
                            //  onConfirm={confirm}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                        </Popconfirm>
                        <Button color="primary" variant="outlined" onClick={onClickPreviewDetail}>Export Details</Button>


                    </Flex></Col>
                </Row>

            </Form>
        </div>
    );
};

export default App;