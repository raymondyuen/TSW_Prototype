import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Table,
  TableColumnsType,
  TimePicker,
  Alert
} from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import Title from 'antd/es/typography/Title';
import React, { useState, MouseEvent } from 'react';
import './App.css';
import { Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { HomeOutlined } from '@ant-design/icons';

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











function App() {
  const navigate = useNavigate();
  const [totalNum, setTotalNum] = useState("0");
  const [mainForm] = Form.useForm();
  const [currentMode, setCurrentMode] = useState("air")
  const [followSchedule, setFollowSchedule] = useState("Y")
  const onFollowScheduleChange = (e: RadioChangeEvent) => {
    setFollowSchedule(e.target.value)
  }
  const scheduleColumns: TableColumnsType = [
    {
      title: 'Details',
      dataIndex: 'details',
      render: (text: String) => <a href='/Ca003View'>{text}</a>
    }, {
      title: 'Actual Arrival Date',
      dataIndex: 'actualArrivalDate'
    }, {
      title: currentMode === 'water' ? 'Vessel Name, Vessel Chinese Name (Vessel ID:Call Sign)   ' : currentMode === 'air' ? 'Flight ID (Matching)' : 'Train No.',
      dataIndex: 'vessel',
      width: 150
    }, {
      title: 'Carrier Name (Carrier ID:ID Type)',
      dataIndex: 'carrier',
      width: 150
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

  const manifestColumns: TableColumnsType = [
    {
      title: 'Actual Arrival Date',
      dataIndex: 'actualArrivalDate'
    }, {
      title: currentMode === 'water' ? 'Vessel Name (Vessel ID:Call Sign)' : currentMode === 'air' ? 'Flight ID' : 'Train No.',
      dataIndex: 'vessel',
      width: 150
    }, {
      title: 'Carrier Name (Carrier ID:ID Type)',
      dataIndex: 'carrier',
      width: 150
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
  var scheduleData: ScheduleDataType[] = [
    {
      key: '1',
      details: 'Details',
      actualArrivalDate: '2024-05-20 00:00',
      vessel: currentMode === 'water' ? 'Vessel E3 , - (VE3 :VE3)' : currentMode === 'air' ? 'AE886' : 'T123456',
      carrier: 'CRT - Carrier (333333 : BR)',
      ms: 'UM',
      schd: 'SE',
      matchedUMR: '-'
    }, {
      key: '2',
      details: 'Details',
      actualArrivalDate: '2024-05-20 00:00',
      vessel: currentMode === 'water' ? 'Vessel E6 , - (VE6 :VE6)' : currentMode === 'air' ? 'CX886' : 'T123456',
      carrier: 'CRT - Carrier (444444 : BR)',
      ms: 'UM',
      schd: 'SE',
      matchedUMR: '-'
    }
  ]
  var manifestData: ManifestDataType[] = [
    {
      key: '1',
      actualArrivalDate: '2024-05-20',
      //vessel: 'Vessel E3 , - (VE3 :VE3)',
      vessel: currentMode === 'water' ? 'Vessel E3 (VE3 :VE3)' : currentMode === 'air' ? 'AE886' : 'T123456',
      carrier: 'CRT - Carrier1 (198747 : BR)',
      telNo: '2258 2258',
      ms: 'UM',
      mfest: 'QI',
      umrVer: '2M0CGDR100A1 (2)'
    }, {
      key: '2',
      actualArrivalDate: '2024-05-20',
      vessel: currentMode === 'water' ? 'Vessel E6 (VE6 :VE6)' : currentMode === 'air' ? 'CX886' : 'A123456',
      carrier: 'CRT - Carrier2 (777887 : BR)',
      telNo: '2257 2258',
      ms: 'UM',
      mfest: 'QI',
      umrVer: '2M0CGDR100A3 (2)'
    }
  ]

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

  function clickNew(): void {
    navigate("/Ca003New");
  }
  function clickAmend(): void {
    if(selectedScheduleKeys.length == 0 && selectedManifestKeys.length == 0){
      setAlertMsg("Please select at least 1 record must be selected.")
      setAlertSuccessMsg("");
      return;
    }
    navigate("/Ca003Amend");
  }

  function clickIssueOMA(event: React.MouseEvent<HTMLElement>): void {
    if(selectedScheduleKeys.length == 0 && selectedManifestKeys.length == 0){
      setAlertMsg("Please select at least 1 record must be selected.")
      setAlertSuccessMsg("");
      return;
    }
    navigate("/CM009");
  }

  const onClickSearch = async () => {
    try {
      const values = await mainForm.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      return;
    }
    setTotalNum("2")
    setSData(scheduleData);
    setMData(manifestData);
    setIsShow("none");
  }
  const onClickRest = async () => {
    setTotalNum("0")
    setSData(null);
    setMData(null);
  }
  const onClickPreviewDetail = () => {
    window.open("./Detail of Schedule Information.xlsx")
  }
  const onClickPreviewSummay = () => {
    window.open("./Summary of Schedule Information.xlsx")
  }
  const onClickEnquire  = () => {
    if (isShow==="none"){
      setIsShow("block");
    }else{
      setIsShow("none");
    }

  }

  const onClickMatchResultAction = () => {
    console.log(selectedScheduleKeys)
    console.log(selectedManifestKeys)
    if(selectedScheduleKeys.length != 1 || selectedManifestKeys.length != 1){
      setAlertMsg("Please select 1 schedule and 1 manifest for matching.")
      setAlertSuccessMsg("");
      return;
    }
      setAlertMsg("")
      scheduleData[0].ms="PM";
      setSData(scheduleData);
      manifestData[0].ms="PM";
      setMData(manifestData);
      setAlertSuccessMsg("1 schedule and 1 manifest record updated.");
  }
  const onClickUnMatchResultAction = () => {
    console.log(selectedScheduleKeys)
    console.log(selectedManifestKeys)
    if(selectedScheduleKeys.length != 1 || selectedManifestKeys.length != 1){
      setAlertMsg("Please select 1 schedule and 1 manifest for un-match.")
      setAlertSuccessMsg("");
      return;
    }
    setAlertMsg("")
    scheduleData[0].ms="UM";
    setSData(scheduleData);
    manifestData[0].ms="UM";
    setMData(manifestData);
    setAlertSuccessMsg("1 schedule and 1 manifest record updated.");
  }
  //const onClickScheduleAction = function(ms_st:String){
  function onClickScheduleMSAction( ms_st:String): void {
    if(selectedScheduleKeys.length <= 0){
      setAlertMsg("Please select at least 1 schedule.")
      setAlertSuccessMsg("");
      return;
    }
    setAlertMsg("")
    scheduleData[0].ms=ms_st;
    debugger;
    setSData(scheduleData);
    setAlertSuccessMsg(selectedScheduleKeys.length+ " Schedule Record updated.");
  }

  function onClickScheduleAction( ms_st:String): void {
    if(selectedScheduleKeys.length <= 0){
      setAlertMsg("Please select at least 1 schedule.")
      setAlertSuccessMsg("");
      return;
    }
    setAlertMsg("")
    scheduleData[0].schd=ms_st;
    debugger;
    setSData(scheduleData);
    setAlertSuccessMsg(selectedScheduleKeys.length+ " Schedule Record updated.");
  }
  function onClickManifestAction( ms_st:String): void {
    if(selectedScheduleKeys.length == 0 && selectedManifestKeys.length == 0){
      setAlertMsg("Please select at least 1 record.")
      setAlertSuccessMsg("");
      return;
    }
    setAlertMsg("")
    manifestData[0].ms=ms_st;
    setMData(manifestData);
    setAlertSuccessMsg(selectedScheduleKeys.length+ " Manifest Record updated.");
  }




  const [isShow, setIsShow] = useState("block")
  const [sData, setSData] = useState<Array<ScheduleDataType> | null>(null);
  const [mData, setMData] = useState<Array<ManifestDataType> | null>(null);
  const [alertMsg, setAlertMsg] = useState("")
  const [alertSuccessMsg, setAlertSuccessMsg] = useState("")
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

  function retrievalKeysFor(title: DisplayTitle, followSchedule: String, currentMode: String) {
    var disable = title === 'Manifest' && followSchedule === 'Y'
    return (
        <div style={{ minWidth: '800px', maxWidth:'1200px'}}>
          {disable ? "":<div>
            <h3>Retrieval keys for {title}</h3>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Arrival / Departure Date" labelCol={{ span: 8 }} rules={[{ required: true }]}>
                  <RangePicker disabled={disable} placeholder={["YYYY-MM-DD","YYYY-MM-DD"]}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                {title === 'Schedule' ?
                    <Form.Item label="Arrival / Departure Time" labelCol={{ span: 8 }} >
                      <TimePicker.RangePicker allowClear format={'HH:mm'} placeholder={["00:00","00:00"]}/>
                    </Form.Item>
                    : ''}
              </Col>
            </Row>

            {currentMode === 'air' ?
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Flight ID" labelCol={{ span: 8 }} rules={[{ required: true }]}>
                      <Input disabled={disable} />
                    </Form.Item>
                  </Col>
                  {title === 'Schedule' ?
                      <Col span={12}>
                        <Form.Item label="Flight ID (Matching)" labelCol={{ span: 8 }}>
                          <Input disabled={disable} />
                        </Form.Item>
                      </Col>
                      : ''}
                </Row>
                : ''}

            {currentMode === 'water' ?
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


            {currentMode === 'rail' ?
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
                {title === 'Manifest' ?
                    <Form.Item label="UMR" labelCol={{ span: 8 }}>
                      <Input disabled={disable} />
                    </Form.Item>
                    : ''}
              </Col>
            </Row>
          </div>}
        </div>
    )
  }
  return (
    <div style={{ padding: '0 24px' }}>
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },
          {
            title: "CA Function",
          },
          {
            title: <a href="/Ca003Enquiry">Enquire Schedules and Manifest for Probable Matching</a>,
          }
        ]}
      />
      <h1>Enquire Schedules and Manifest for Probable Matching</h1>
      <Form
        form={mainForm}
        labelAlign='left'
        layout="horizontal"
        style={{display:isShow}}
        validateMessages={validateMessages}
      >
        <Space wrap>
          <Space.Compact block>
            <Form.Item label="Transport Mode" labelCol={{ span: 12 }} style={{ width: '250px' }}  >
              <Select onChange={setCurrentMode} defaultValue={"air"}>
                <Select.Option value="air">Air</Select.Option>
                <Select.Option value="water">Ocean/River</Select.Option>
                <Select.Option value="rail">Rail</Select.Option>
              </Select>
            </Form.Item>
          </Space.Compact>
          <Space.Compact block >
            <Form.Item label="Shipment Type" labelCol={{ span: 12 }} style={{ width: '250px' }} >
              <Select defaultValue={"inbound"}>
                <Select.Option value="inbound">Inbound</Select.Option>
                <Select.Option value="outbound">Outbound</Select.Option>
              </Select>
            </Form.Item>
          </Space.Compact>
          <Space.Compact block >
            <Form.Item label="Manifest retrieval to follow that of schedule? " labelCol={{ span: 16 }} style={{ width: '500px' }} >
              <Radio.Group onChange={onFollowScheduleChange} value={followSchedule}>
                <Radio value="Y">Yes</Radio>
                <Radio value="N">No</Radio>
              </Radio.Group>
            </Form.Item>
          </Space.Compact>
        </Space>
        <Row>
          <Col span={24}>
            {retrievalKeysFor('Schedule', followSchedule, currentMode)}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {retrievalKeysFor('Manifest', followSchedule, currentMode)}
          </Col>
        </Row>
        <Row style={{ width: 1600 }}>
          <Col span={24}>
            <Form.Item label="Schedule Match Status" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              <Radio.Group defaultValue={"all"}>
                <Radio value="all"> All </Radio>
                <Radio value="matched"> Matched </Radio>
                <Radio value="unmatched"> Unmatched </Radio>
                <Radio value="cancelShipment"> Cancel Shipment </Radio>
                <Radio value="nilCargo"> Nil Cargo </Radio>
                <Radio value="offHired"> Off Hired </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ width: 1600 }}>
          <Col span={24}>
            <Form.Item label="Manifest Match Status" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              <Radio.Group defaultValue={"all"}>
                <Radio value="all"> All </Radio>
                <Radio value="matched"> Matched </Radio>
                <Radio value="unmatched"> Unmatched </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ width: 1600 }}>
          <Col span={24}>
            <Form.Item label="Schedule Status" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
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
        <Row style={{ width: 1600 }}>
          <Col span={24}>
            <Form.Item label="Manifest Status" labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
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
          <Button color='primary' variant='outlined' onClick={onClickRest}>Reset</Button>
          <Button color='primary' variant='solid' htmlType="submit" onClick={onClickSearch}>Search</Button>
        </Flex>
        <Divider></Divider>
      </Form>
      <h3>Probable Matching Result</h3>
      {alertSuccessMsg == "" ? "" : <Alert type={"success"} closable message={alertSuccessMsg} onClose={()=>setAlertSuccessMsg("")}/>}

        {alertMsg == "" ? "" : <Alert type='error' closable message={alertMsg} onClose={()=>setAlertMsg("")}/>}
      <Col span={24}>
        <fieldset disabled={false} style={{ border: '0px' }}>
          <Row justify='center' style={{marginBottom: 10}}>

            <Space>
              <Button color="primary" variant="outlined" onClick={onClickMatchResultAction}>Revert Dummy Schedule</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickScheduleMSAction("NC")}>Nil Cargo</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickScheduleMSAction("OH")}>Off Hired</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickScheduleMSAction("CS")}>Cancel Shipment</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickScheduleAction("NE")}>Non Exist</Button>
              <Button color="primary" variant="outlined" onClick={onClickMatchResultAction}>Match</Button>
              <Button color="primary" variant="outlined" onClick={clickIssueOMA}>Issue OS Manifest Advice</Button>
            </Space>
          </Row>
          <Row justify='center' style={{marginBottom: 10}}>
            <Flex gap="small" justify='flex-end'>
              <Button color="primary" variant="outlined" onClick={onClickMatchResultAction}>Mark off Dummy Schedule</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickScheduleAction("SE")}>Revert Pending</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickScheduleAction("PD")}>Pending</Button>
              <Button color="primary" variant="outlined" onClick={onClickUnMatchResultAction}>Unmatch</Button>
              <Button color="primary" variant="outlined" onClick={clickNew}>New Sch</Button>
              <Button color="primary" variant="outlined" onClick={clickAmend}>Amend</Button>
              <Button color="primary" variant="outlined" onClick={()=>onClickManifestAction("VD")}>Void Manifest</Button>
            </Flex>
          </Row>
        </fieldset>
      </Col>
      <Space >
        
        <Space.Compact  >

          <SearchResult totalNum={totalNum} displayTitle='Schedule' columns={scheduleColumns} data={sData != null ? sData : []} rowSelection={scheduleSelection} />
        </Space.Compact>
        <Space.Compact>
          <SearchResult totalNum={totalNum} displayTitle='Manifest' columns={manifestColumns} data={mData != null ? mData : []} rowSelection={manifestSelection} />
        </Space.Compact>
      </Space>
      <Col span={24}>
          <div>OS : Outstanding Manifest Advice Issued, O1 : O/S 1st reminder, O2 : O/S 2nd reminder, CL : Closed by TCB, NE : Non-exist, SE : Exist, RF : Referred to TCB, UI : Under Legal Action</div>
          <div>NC : Nil Cargo, CS : Cancel Shipment, OH : Off-hired, AM : Auto-matched, PM : Probable Matched, UM, Umatch, QI Query Issued, VD : Void, PD : Pending, NV : Not Voided</div>
        </Col>
      <Divider />
      <Row>
        
        <Col span={24}>
          
          <Flex gap="small" justify='flex-end'>
            <Button color="primary" variant="outlined" onClick={onClickEnquire}>Enquire</Button>
            <Button color="primary" variant="solid" onClick={onClickPreviewDetail}>Export Details</Button>
            <Button color="primary" variant="solid" onClick={onClickPreviewSummay}>Export Summary</Button>
          </Flex>

        </Col>
        
      </Row>
    </div>



  );
}


const SearchResult = ({ totalNum, displayTitle, columns, data, rowSelection }: { totalNum:String, displayTitle: DisplayTitle, columns: TableColumnsType, data: object[], rowSelection: TableRowSelection }) => (
  <Card title={displayTitle}>
    Total No. of Records:  {totalNum}
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      pagination={
        {
          showSizeChanger: true,
          // showTotal: (total, range) => `Total No. of Records = ${total}, displaying ${range[0]} to ${range[1]}`
        }
      } />
  </Card>
)





export default App;
