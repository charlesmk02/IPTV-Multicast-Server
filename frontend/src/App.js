import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Adapter from './Components/Adapter';

function App() {
  const [adapter0Channels, setAdapter0Channels] = useState()
  const [adapter1Channels, setAdapter1Channels] = useState()

  return (
    <div className="App">
      <div className="searchResult">
        <Card>
          <Card.Header>
            <h6 className="searchTitle" style={{ margin: 0 }}>IPTV Multicast Configuration</h6>
          </Card.Header>
        </Card>
        <br />
        <div>
          <Adapter grandParentCallback={(childData) => {
            setAdapter0Channels(childData)
          }} adapter={0} otherAdapterChannels={adapter1Channels} />
        </div>
        <hr />
        <Adapter grandParentCallback={(childData) => {
          setAdapter1Channels(childData)
        }} adapter={1} otherAdapterChannels={adapter0Channels} />
      </div>
    </div>
  );
}

export default App;
