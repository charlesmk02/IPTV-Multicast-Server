import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Scan from './Components/Scan';
import Stream from './Components/Stream';

function App() {
  const [channels, updateChannels] = useState({})
  const [freq, updateFreq] = useState()

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
          <Scan parentCallback={(childData) => {
            updateFreq(childData["freq"])
            updateChannels(childData["chl"])
          }} />
        </div>
        <br />
        <div>
          {Object.entries(channels).length != 0 ?
            <Stream channels={channels} freq={freq} />
            :
            <div>
              <h4 style={{ marginTop: 60, marginBottom: 40, textAlign: 'center' }}>No channels</h4>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
