import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Table } from 'react-bootstrap';

function App() {
  const [freq, updateFreq] = useState();
  const [channels, updateChannels] = useState([])

  const handleOnScan = (event) => {
    event.preventDefault()

    fetch(`http://192.168.5.105:9000/scan?freq=${freq}`)
      .then(response => response.json())
      .then(data => updateChannels(data["result"]))
  }

  const handleOnStream = (event) => {
    event.preventDefault()
    console.log(channels)
  }

  return (
    <div className="App">
      <h1>IPTV Multicast Configuration</h1>
      <Form onSubmit={handleOnScan}>
        <Form.Label>Frequency : </Form.Label>
        <Form.Control type="text" placeholder="Frequency" onChange={(e) => updateFreq(parseInt(e.target.value))} />
        <Button type="submit">Scan</Button>
      </Form><br />
      <Form onSubmit={handleOnStream}>
        <Table striped size="md">
          <thead>
            <tr>
              <th>Channel</th>
              <th>Multicast Address</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(channels).map((key, i) => {
              return (
                <tr key={channels[key].sid}>
                  <td>{key}</td>
                  <td><Form.Control type="text" placeholder="IP:PORT" onChange={(e) => {
                    let chl = { ...channels };
                    chl[key].ip = e.target.value
                    updateChannels(chl)
                  }}></Form.Control></td>
                  <td><Form.Control type="checkbox" defaultChecked onChange={(e) => {
                    let chl = { ...channels };
                    chl[key].checked = e.target.checked
                    updateChannels(chl)
                  }}></Form.Control></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Button type="submit">Stream</Button>
      </Form>
    </div>
  );
}

export default App;
