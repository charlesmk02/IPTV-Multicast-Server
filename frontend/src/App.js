import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Form, Card, Table, Row, Col } from 'react-bootstrap';
import { postData } from '../src/Hook/Hook';

function App() {
  const { handleSubmit, formState } = useForm()
  const { isSubmitting } = formState
  const [freq, updateFreq] = useState();
  const [channels, updateChannels] = useState([])
  // const [error, setError] = useState({ "state": false, "message": '' })

  const handleOnScan = () => {
    return new Promise((resolve, reject) => {
      var re = new RegExp('^\\d{9}$')
      if (!re.test(freq)) {
        reject()
        alert('Invalid frequency')
      } else {
        postData('http://192.168.5.105:9000/scan', { 'freq': freq })
          .then(data => updateChannels(data["result"]))
          .then(() => resolve())
      }
    });
  }

  const handleOnStart = (event) => {
    return new Promise((resolve, reject) => {
      let obj = {}
      let data = {}
      for (let key in channels) {
        if (channels[key].checked) {
          obj[`${key}`] = channels[key]
        }
      }

      var re = /^2(?:2[4-9]|3\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)){3}:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
      var error = false
      for (let key in obj) {
        console.log(re.test(obj[key].ip))
        if (!re.test(obj[key].ip)) {
          reject()
          error = true
          alert('Invalid multicast address(es)')
          break
        }
      }

      if (!error) {
        console.log(obj)
        data["freq"] = freq
        data["chl"] = obj
        console.log(data)
        postData('http://192.168.5.105:9000/start-stream', data)
          .then(() => resolve())
      }
    })
  }

  const handleOnStop = (event) => {
    event.preventDefault()

    fetch('http://192.168.5.105:9000/stop-stream')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div className="App">
      <div className="searchResult">
        <Card>
          <Card.Header>
            <h6 className="searchTitle" style={{ margin: 0 }}>IPTV Multicast Configuration</h6>
          </Card.Header>
        </Card>
        <br />
        <form onSubmit={handleSubmit(handleOnScan)}>
          <Row className="form-rows" className="api-keys">
            <Col sm={6}>
              <br />
              <Form.Label className="form-label">Frequency : </Form.Label>
              <Form.Control type="text" placeholder="123456789" onChange={(e) => updateFreq(parseInt(e.target.value))} />
              <br />
              <button disabled={isSubmitting} className="btn btn-primary mr-1">
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Scan
              </button>
              <br />
            </Col>
          </Row>
        </form><br />

        <form onSubmit={handleSubmit(handleOnStart)}>
          <Table id="site" striped size="md">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Channel</th>
                <th>Multicast Address</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody className="result" style={{ textAlign: "center" }}>
              {Object.keys(channels).map((key, i) => {
                return (
                  <tr className="entreprise" key={channels[key].sid}>
                    <td>{key}</td>
                    <td><Form.Control type="text" placeholder="IP:PORT" onChange={(e) => {
                      let chl = { ...channels };
                      chl[key].ip = e.target.value
                      updateChannels(chl)
                    }}></Form.Control></td>
                    <td>
                      <Form.Check defaultChecked onChange={(e) => {
                        let chl = { ...channels };
                        chl[key].checked = e.target.checked
                        updateChannels(chl)
                      }}>
                      </Form.Check>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <button disabled={isSubmitting} className="btn btn-success">
                {isSubmitting && <span className="spinner-grow spinner-grow-sm"></span>}
                Stream
              </button>
        </form>
        <br />
        <Button className="stop-button" onClick={handleOnStop}>Stop</Button>
      </div>
    </div>
  );
}

export default App;
