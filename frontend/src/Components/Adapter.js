import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Scan from './Scan';
import Stream from './Stream';
import postData from '../Hook/postData';
import { Button, Form, Table, Spinner } from 'react-bootstrap';

const Adapter = (props) => {
    const [channelsScanned, setChannelsScanned] = useState({})
    const [frequency, setFrequency] = useState()
    const [streamState, setStreamState] = useState(false)
    const [previousStreamState, setPreviousStreamState] = useState(false)
    const [scanState, setScanState] = useState(false)
    const [channelsStreamed, setChannelsStreamed] = useState({})
    const [protocol, setProtocol] = useState('')

    /**
     * On page load, we check if the server is already streaming with the tuner.
     */

    useEffect(() => {
        postData('http://192.168.5.105:9000/stream-state', {
            'adpt': props.adapter
        })
            .then((response) => {
                
                /**
                 * If so, we retrieve the stream parameters.
                 */
                
                if (response.result != false) {
                    setPreviousStreamState(true)
                    setChannelsStreamed(response.result["chl"])
                    setProtocol(response.result["proto"])
                    setFrequency(response.result["freq"])
                }
            })
    }, [])

    /**
     * Whenever the channels streamed in this component change 
     * we pass the data to the App component. 
     */
    
    useEffect(() => {
        props.grandParentCallback(channelsStreamed)
    }, [channelsStreamed])
    
    const handleOnStop = (event) => {
        event.preventDefault()

        fetch('http://192.168.5.105:9000/stop-stream')
            .then(() => {
                setPreviousStreamState(false)
                setChannelsStreamed({})
            })
            .catch(err => {
                alert(err.message)
                console.log(err.message)
            })
    }

    return (
        <div>
            {previousStreamState ? // Check if the server is already streaming with the tuner
                
                /**
                 * If so, we display the parameters of the stream in a table.
                 * The user can stop all the streams with the "Stop" button.
                 */

                <div>
                    <h4 style={{ marginTop: 30 }}>Tuner {props.adapter + 1}</h4>
                    <br />
                    <Form.Label className="form-label">Frequency :
                        <Form.Control disabled={true} type="text" value={frequency} />
                    </Form.Label>
                    <br />
                    <Form.Label className="form-label">Protocol :
                        <Form.Select disabled={true} value={protocol}>
                            <option value="RTP">RTP</option>
                            <option value="UDP">UDP</option>
                        </Form.Select>
                    </Form.Label>
                    <Table id="site" striped size="md">
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>Channel</th>
                                <th>Multicast Address</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="result" style={{ textAlign: "center" }}>
                            {Object.keys(channelsStreamed).map((key, i) => {
                                return (
                                    <tr className="entreprise" key={channelsStreamed[key].sid}>
                                        <td>{key}</td>
                                        <td><Form.Control disabled={true} type="text" value={channelsStreamed[key].ip}></Form.Control></td>
                                        <td><Spinner animation="grow" size='sm'/></td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </Table>
                    <div>
                        <Button className="stop-button" onClick={handleOnStop}>Stop</Button>
                    </div>
                </div>
                :

                /**
                 * Otherwise, the user can scan a frequency and then start a new stream.
                 */
                
                <div>
                    <h4 style={{ marginTop: 30 }}>Tuner {props.adapter + 1}</h4>
                    <div>
                        <Scan parentCallback1={(childData) => {
                            setFrequency(childData["freq"]) // We want to pass the frequency to the Stream component
                            setChannelsScanned(childData["chl"]) // and the channels scanned too,
                        }} parentCallback2={(childData) => {
                            setScanState(childData) // and also prevent stream when the tuner is scanning.
                        }} adapter={props.adapter} streamState={streamState} />
                    </div>
                    <br />
                    <div>
                        {!scanState ?
                            <Stream parentCallback1={(childData) => {
                                setStreamState(childData) // We want to prevent the tuner from scanning during stream.
                            }} parentCallback2={(childData) => {
                                setChannelsStreamed(childData) // We want to pass the channels streamed to the App component.
                            }} channelsScanned={channelsScanned} frequency={frequency} adapter={props.adapter} otherAdapterChannels={props.otherAdapterChannels} />
                            :
                            null
                        }
                    </div>
                </div>

            }
        </div>
    );
}

export default Adapter;