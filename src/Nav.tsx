import React from 'react';
import { Row, Col, Select, Image } from 'antd';

import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    navigate(`/${value}`, { replace: true });

  };

  return (
    <div>
      <Row align="bottom">
        <Col><Image
          width={300}
          src="./tsw_logo.png" preview={false}
        /></Col>



        <Col> Function ID : <Select
          style={{ width: 600 }}
          defaultValue={window.location.pathname.substr(1)}
          aria-label='function ID'
          onChange={handleChange}
          options={[
            {
              label: <span>Common Function</span>,
              title: 'Common Function',
              options: [
                { label: <span>UF-EM-CM-020 Create Highlighting Critical Outstanding Manifest Cases</span>, value: 'Cm020' },
              ],
            },
            {
              label: <span>CA Function</span>,
              title: 'CA Function',
              options: [
                { label: <span>UF-EM-CA-003 Enquiry of Schedules and Manifest for Probable Matching</span>, value: 'Ca003Enquiry' },
              ],
            },
          ]}
        /></Col>
      </Row>
    </div>
  );
}

export default App;