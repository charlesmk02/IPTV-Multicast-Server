import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Scan from './Scan';
import Stream from './Stream';
import postData from '../Hook/postData';
import { Button, Form, Table, Spinner } from 'react-bootstrap';

const Adapter = (props) => {
    const [channels, updateChannels] = useState({})
    const [freq, updateFreq] = useState()
    const [streamState, updateStreamState] = useState(false)
    const [scanState, updateScanState] = useState(false)
    const [selectedChannels, updateSelectedChannels] = useState({})
    const [previousStreamingState, setPreviousStreamingState] = useState(false)
    const [channelsStreamed, setChannelsStreamed] = useState({})
    const [protocol, setProtocol] = useState('')

    useEffect(() => {
        postData('http://192.168.5.105:9000/stream-state', {
            'adpt': props.adapter
        })
            .then((response) => {
                if (response.result != false) {
                    setPreviousStreamingState(true)
                    setChannelsStreamed(response.result["chl"])
                    setProtocol(response.result["proto"])
                }
            })
    }, [])

    useEffect(() => {
        if (previousStreamingState) {
            props.grandParentCallback(channelsStreamed)
        } else {
            props.grandParentCallback(selectedChannels)
        }
    }, [selectedChannels, previousStreamingState, channelsStreamed])

    const handleOnStop = (event) => {
        event.preventDefault()

        fetch('http://192.168.5.105:9000/stop-stream')
            .then(() => {
                setPreviousStreamingState(false)
            })
            .catch(err => {
                alert(err.message)
                console.log(err.message)
            })
    }

    return (
        <div>
            {previousStreamingState ?
                <div>
                    <h4 style={{ marginTop: 30 }}>Tuner {props.adapter + 1} <Spinner animation="grow" size='sm'/></h4>
                    <Table id="site" striped size="md">
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>Channel</th>
                                <th>Multicast Address</th>
                                <th>Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="result" style={{ textAlign: "center" }}>
                            {Object.keys(channelsStreamed).map((key, i) => {
                                return (
                                    <tr className="entreprise" key={channelsStreamed[key].sid}>
                                        <td>{key}</td>
                                        <td><Form.Control disabled={true} type="text" value={channelsStreamed[key].ip}></Form.Control></td>
                                        <td>{protocol}</td>
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
                <div>
                    <h4 style={{ marginTop: 30 }}>Tuner {props.adapter + 1}</h4>
                    <div>
                        <Scan parentCallback1={(childData) => {
                            updateFreq(childData["freq"])
                            updateChannels(childData["chl"])
                        }} parentCallback2={(childData) => {
                            updateScanState(childData)
                        }} adapter={props.adapter} streamState={streamState} />
                    </div>
                    <br />
                    <div>
                        {!scanState ?
                            <Stream parentCallback1={(childData) => {
                                updateStreamState(childData)
                            }} parentCallback2={(childData) => {
                                updateSelectedChannels(childData)
                            }} channels={channels} freq={freq} adapter={props.adapter} otherAdapterChannels={props.otherAdapterChannels} />
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