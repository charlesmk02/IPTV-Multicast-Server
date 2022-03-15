import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Adapter from './Components/Adapter';

function App() {
  const [adapter0ScanState, setAdapter0ScanState] = useState()
  const [adapter1ScanState, setAdapter1ScanState] = useState()
  const [adapter0StreamState, setAdapter0StreamState] = useState()
  const [adapter1StreamState, setAdapter1StreamState] = useState()

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
          <Adapter grandParentCallback1={(childData) => {
            setAdapter0ScanState(childData)
          }} grandParentCallback2={(childData) => {
            setAdapter0StreamState(childData)
          }} adapter={0} otherAdapterScanState={adapter1ScanState} otherAdapterStreamState={adapter1StreamState} />
        </div>
        <hr />
        <Adapter grandParentCallback1={(childData) => {
            setAdapter1ScanState(childData)
          }} grandParentCallback2={(childData) => {
            setAdapter1StreamState(childData)
          }} adapter={1} otherAdapterScanState={adapter0ScanState} otherAdapterStreamState={adapter0StreamState} />
      </div>
    </div>
  );
}

export default App;
