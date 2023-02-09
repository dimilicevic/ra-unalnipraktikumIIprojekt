import React, {useState} from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import { Withdraw } from './account/Withdraw';
import { Profile } from './account/Profile';
import { Summary } from './account/Summary';


export const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <>
      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Tab eventKey="profile" title="Profile">
          <Profile  />
        </Tab>
        <Tab eventKey="withdraw" title="Withdraw">
          <Withdraw  />
        </Tab>
      </Tabs>
    </>
  );
}
