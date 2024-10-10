import React, { useState } from 'react';
import { Row,Col, Select, Button, Space, DatePicker, version, Flex } from 'antd';

import { useNavigate ,matchRoutes, useLocation} from 'react-router-dom';


const App: React.FC = () => {
  const navigate = useNavigate();
  
  const useCurrentPath = () => {
    return window.location.pathname;
    }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    navigate(`/${value}`, { replace: true });
    
  };

  return (
    <div>
      <Row>
        <Col>Select Function ID : </Col>
        <Col><Select
      style={{ width: 600 }}
      defaultValue={window.location.pathname.substr(1)}
aria-label='function ID'
        onChange={handleChange}
        options={[
          {
            label: <span>Common Function</span>,
            title: 'Common Function',
            options: [
              { label: <span>UF-EM-CM-009 Issue Query for Outstanding Manifest Advice</span>, value: 'Cm009' },
              { label: <span>UF-EM-CM-020 Create Highlighting Critical Outstanding Manifest Cases</span>, value: 'Cm020' },
            ],
          },
          {
            label: <span>CA Function</span>,
            title: 'CA Function',
            options: [
              { label: <span>UF-EM-CA-003 Maintenance of Arrival/ Departure Information for Probable Matching</span>, value: 'Ca003' }
            ],
          },
        ]}
      /></Col>
      </Row>
    </div>
  );
}

export default App;