import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Adapter0 from './Components/Adapter0';
import Adapter1 from './Components/Adapter1';

function App() {

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
          <Adapter0 />
        </div>
        <hr />
        <Adapter1 />
      </div>
    </div>
  );
}

export default App;
