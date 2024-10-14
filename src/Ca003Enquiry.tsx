import React, { useState } from 'react';
import './App.css';
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Table,
  TableColumnsType,
  Col
} from 'antd';
import Title from 'antd/es/typography/Title';
import { TableRowSelection } from 'antd/es/table/interface';



type DisplayTitle = "Schedule" | "Manifest"

const { RangePicker } = DatePicker;

interface ScheduleDataType {
  key: React.Key
  details: String
  actualArrivalDate: String
  vessel: String
  carrier: String
  ms: String
  schd: String
  matchedUMR: String
}

const scheduleData: ScheduleDataType[] = [
  {
    key: '1',
    details: 'Details',
    actualArrivalDate: '20/05/2024 00:00',
    vessel: 'Vessel E3 , - (VE3 :VE3)',
    carrier: 'CRT - Carrier (20000000 : BR)',
    ms: 'UM',
    schd: 'SE',
    matchedUMR: '-'
  }, {
    key: '2',
    details: 'Details',
    actualArrivalDate: '20/05/2024 00:00',
    vessel: 'Vessel E3 , - (VE3 :VE3)',
    carrier: 'CRT - Carrier (20000000 : BR)',
    ms: 'UM',
    schd: 'SE',
    matchedUMR: '-'
  }
]

const scheduleColumns: TableColumnsType = [
  {
    title: 'Details',
    dataIndex: 'details',
    render: (text: String) => <a>{text}</a>
  }, {
    title: 'Actual Arrival Date',
    dataIndex: 'actualArrivalDate'
  }, {
    title: 'Vessel Name, Vessel Chinese Name (Vessel ID:Call Sign)',
    dataIndex: 'vessel'
  }, {
    title: 'Carrier Name (Carrier ID:ID Type)',
    dataIndex: 'carrier'
  }, {
    title: 'MS',
    dataIndex: 'ms'
  }, {
    title: 'Schd',
    dataIndex: 'schd'
  }, {
    title: 'Matched UMR',
    dataIndex: 'matchedUMR'
  }
]



interface ManifestDataType {
  key: React.Key
  actualArrivalDate: String
  vessel: String
  carrier: String
  telNo: String
  ms: String
  mfest: String
  umrVer: String
}

const manifestData: ManifestDataType[] = [
  {
    key: '1',
    actualArrivalDate: '20/05/2024',
    vessel: 'Vessel E3 , - (VE3 :VE3)',
    carrier: 'CRT - Carrier (20000000 : BR)',
    telNo: '2258 2258',
    ms: 'UM',
    mfest: 'QI',
    umrVer: '2M0CGDR100A1 (2)'
  }, {
    key: '2',
    actualArrivalDate: '20/05/2024',
    vessel: 'Vessel E3 , - (VE3 :VE3)',
    carrier: 'CRT - Carrier (20000000 : BR)',
    telNo: '2258 2258',
    ms: 'UM',
    mfest: 'QI',
    umrVer: '2M0CGDR100A3 (1)'
  }
]

const manifestColumns: TableColumnsType = [
  {
    title: 'Actual Arrival Date',
    dataIndex: 'actualArrivalDate'
  }, {
    title: 'Vessel Name, Vessel Chinese Name (Vessel ID:Call Sign)',
    dataIndex: 'vessel'
  }, {
    title: 'Carrier Name (Carrier ID:ID Type)',
    dataIndex: 'carrier'
  }, {
    title: 'Tel No.',
    dataIndex: 'telNo'
  }, {
    title: 'MS',
    dataIndex: 'ms'
  }, {
    title: 'Mfest',
    dataIndex: 'mfest'
  }, {
    title: 'UMR (Version No.)',
    dataIndex: 'umrVer',
    render: (text: String) => <a>{text}</a>
  }
]


function retrievalKeysFor(title: DisplayTitle, followSchedule: String, currentMode: String) {
  var disable = title == 'Manifest' && followSchedule == 'Y'
  return (
    <div>
      <Title level={2} style={{ color: '#1677ff' }}>Retrieval keys for {title}</Title>
      <Form.Item label="Arrival / Departure" labelCol={{ span: 4 }}>
        <RangePicker showTime disabled={disable} />
      </Form.Item>

      {currentMode == 'air' ?
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Flight ID" labelCol={{ span: 8 }}>
              <Input disabled={disable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Flight ID (Matching)" labelCol={{ span: 8 }}>
              <Input disabled={disable} />
            </Form.Item>
          </Col>
        </Row>
        : ''}

      {currentMode == 'water' ?
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Last Port" labelCol={{ span: 8 }}>
                <Input disabled={disable} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Next Port" labelCol={{ span: 8 }}>
                <Input disabled={disable} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Vessel ID" labelCol={{ span: 8 }}>
                <Input disabled={disable} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Vessel Name" labelCol={{ span: 8 }}>
                <Input disabled={disable} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        : ''}


      {currentMode == 'rail' ?
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Train No." labelCol={{ span: 8 }}>
              <Input disabled={disable} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Wagon No." labelCol={{ span: 8 }}>
              <Input disabled={disable} />
            </Form.Item>
          </Col>
        </Row>
        : ''}


      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Carrier ID" labelCol={{ span: 8 }}>
            <Input disabled={disable} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="ID Type" labelCol={{ span: 8 }}>
            <Select disabled={disable}>
              <Select.Option value="br">Business Registration Number</Select.Option>
              <Select.Option value="hk">Hong Kong ID</Select.Option>
              <Select.Option value="ps">Passport</Select.Option>
              <Select.Option value="td">Travel Document</Select.Option>
              <Select.Option value="ot">Other Official Ref No.</Select.Option>
              <Select.Option value="un">Unclassified</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Carrier Name" labelCol={{ span: 8 }}>
            <Input disabled={disable} />
          </Form.Item>
        </Col>
        <Col span={12}>
        </Col>
      </Row>
    </div>
  )
}





function App() {

  const [currentMode, setCurrentMode] = useState("air")

  const [followSchedule, setFollowSchedule] = useState("N")
  const onFollowScheduleChange = (e: RadioChangeEvent) => {
    setFollowSchedule(e.target.value)
  }

  const [selectedScheduleKeys, setSelectedScheduleKeys] = useState<React.Key[]>([])
  const onScheduleSelectedChange = (newKeys: React.Key[]) => {
    setSelectedScheduleKeys(newKeys)
  }
  const scheduleSelection: TableRowSelection = {
    selectedRowKeys: selectedScheduleKeys,
    onChange: onScheduleSelectedChange
  }

  const [selectedManifestKeys, setSelectedManifestKeys] = useState<React.Key[]>([])
  const onManifestSelectedChange = (newKeys: React.Key[]) => {
    setSelectedManifestKeys(newKeys)
  }
  const manifestSelection: TableRowSelection = {
    selectedRowKeys: selectedManifestKeys,
    onChange: onManifestSelectedChange
  }

  const [mainForm] = Form.useForm()

  return (
    <div className="App" style={{ padding: '0 36px' }}>
      <Title style={{ color: '#1677ff' }}>Enquiry of Schedules and Manifest for Probable Matching</Title>
      <Form
        form={mainForm}
        labelCol={{ span: 8 }}
        labelAlign='left'
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelWrap
      // style={{ maxWidth: 600 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item label="Transport Mode" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
              <Select onChange={setCurrentMode} defaultValue={"air"}>
                <Select.Option value="air">Air</Select.Option>
                <Select.Option value="water">Ocean/River</Select.Option>
                <Select.Option value="rail">Rail</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Shipment Type" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
              <Select defaultValue={"inbound"}>
                <Select.Option value="inbound">Inbound</Select.Option>
                <Select.Option value="outbound">Outbound</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Manifest retrieval to follow that of schedule? " labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
              <Radio.Group onChange={onFollowScheduleChange} value={followSchedule}>
                <Radio value="Y">Yes</Radio>
                <Radio value="N">No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>



        <Row gutter={24}>
          <Col span={12}>
            {retrievalKeysFor('Schedule', followSchedule, currentMode)}
          </Col>
          <Col span={12}>
            {retrievalKeysFor('Manifest', followSchedule, currentMode)}
          </Col>

        </Row>


        <Row>
          <Col span={12}>
            <Form.Item label="Schedule Match Status" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Radio.Group defaultValue={"all"}>
                <Radio value="all"> All </Radio>
                <Radio value="matched"> Matched </Radio>
                <Radio value="unmatched"> Unmatched </Radio>
                <Radio value="cancelShipment"> Cancel Shipment </Radio>
                <Radio value="nilCargo"> NilCargo </Radio>
                <Radio value="offHired"> OffHired </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Manifest Match Status" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Radio.Group defaultValue={"all"}>
                <Radio value="all"> All </Radio>
                <Radio value="matched"> Matched </Radio>
                <Radio value="unmatched"> Unmatched </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Schedule Status" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Radio.Group defaultValue={"all"}>
                <Radio value="all"> All </Radio>
                <Radio value="oma"> OMA issued </Radio>
                <Radio value="pending"> Pending </Radio>
                <Radio value="tcb"> Referred to TCB </Radio>
                <Radio value="underLegelAction"> Under Legel Action </Radio>
                <Radio value="closeByTcb"> Closed by TCB </Radio>
                <Radio value="os1"> O/S 1st Reminder </Radio>
                <Radio value="os2"> O/S 2nd Reminder </Radio>
                <Radio value="notExist"> Not Exist </Radio>
                <Radio value="exist"> Exist </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Manifest Status" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Radio.Group defaultValue={"all"}>
                <Radio value="all"> All </Radio>
                <Radio value="pending"> Pending </Radio>
                <Radio value="queryIssued"> Query Issued </Radio>
                <Radio value="void"> Void </Radio>
                <Radio value="notVoided"> Not Voided </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>





        <Flex justify='right' gap='small'>
          <Button color='primary' variant='outlined'>Reset</Button>
          <Button color='primary' variant='solid'>Search</Button>
        </Flex>

      </Form>

      <Title level={2} style={{ color: '#1677ff' }}>Probable Matching Result</Title>
      <Row>
        <Col span={12}>
          <SearchResult displayTitle='Schedule' columns={scheduleColumns} data={scheduleData} rowSelection={scheduleSelection} />
        </Col>
        <Col span={12}>
          <SearchResult displayTitle='Manifest' columns={manifestColumns} data={manifestData} rowSelection={manifestSelection} />
        </Col>
      </Row>

    </div>
  );
}


const SearchResult = ({ displayTitle, columns, data, rowSelection }: { displayTitle: DisplayTitle, columns:TableColumnsType, data:object[], rowSelection: TableRowSelection }) => (
  <Table
    title={() => <Title level={3} style={{ color: '#1677ff' }}>{displayTitle}</Title>}
    columns={columns}
    dataSource={data}
    rowSelection={rowSelection}
    pagination={
      {
        showSizeChanger: true,
        showTotal: (total, range) => `Total No. of Records = ${total}, displaying ${range[0]} to ${range[1]}`
      }
    } />
)





export default App;
