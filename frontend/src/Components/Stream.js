import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Form, Table } from 'react-bootstrap';
import { postData } from '../Hook/Hook';

const Stream = (props) => {
    const { handleSubmit, formState } = useForm()
    const { isSubmitting } = formState
    const [channels, updateChannels] = useState(props.channels)
    const [streamState, setStreamState] = useState(false)
    const [protocol, setProtocol] = useState('RTP')

    useEffect(() => {
        updateChannels(props.channels)
        props.parentCallback(streamState)
    }, [props.channels, streamState])

    const hasDuplicates = (array) => {
        return (new Set(array)).size !== array.length;
    }

    const handleOnStart = () => {
        return new Promise((resolve, reject) => {
            try {
                console.log(channels)
                var obj = {}
                for (let key in channels) {
                    if (channels[key].checked) {
                        obj[`${key}`] = channels[key]
                    }
                }

                if (Object.entries(obj).length === 0) {
                    throw new Error('No channels selected')
                }

                var re = /^2(?:2[4-9]|3\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)){3}:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
                for (let key in obj) {
                    if (!re.test(obj[key].ip)) {
                        throw new Error('Invalid multicast address(es)')
                    }
                }

                let array = Object.entries(obj)
                let addresses = []
                for (let i = 0; i < array.length; i++) {
                    addresses.push(array[i][1].ip)
                }
                if (hasDuplicates(addresses)) {
                    throw new Error('Repeated address(es)')
                }
                let data = {
                    "adpt": props.adapter,
                    "chl": obj,
                    "freq": props.freq,
                    "proto": protocol
                }

                setStreamState(true)

                postData('http://192.168.5.105:9000/start-stream', data)
                    .then(() => {
                        setStreamState(false)
                        resolve()
                    })
                    .catch(err => {
                        setStreamState(false)
                        alert(err.message)
                        console.log(err.message)
                        reject(err)
                    })
            }
            catch (err) {
                alert(err.message)
                console.log(err.message)
                reject(err)
            }
        })
    }

    const handleOnStop = (event) => {
        event.preventDefault()

        fetch('http://192.168.5.105:9000/stop-stream')
            .then(() => {
                setStreamState(false)
            })
            .catch(err => {
                alert(err.message)
                console.log(err.message)
            })
    }

    return (
        <div>
            {Object.entries(channels) != 0 ?
                <div>
                    <form onSubmit={handleSubmit(handleOnStart)}>
                        <Form.Label className="form-label">Protocol :
                            <Form.Select disabled={streamState} value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                                <option value="RTP">RTP</option>
                                <option value="UDP">UDP</option>
                            </Form.Select>
                        </Form.Label>
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
                                            <td><Form.Control disabled={streamState} type="text" placeholder="IP:PORT" onChange={(e) => {
                                                let chl = { ...channels };
                                                chl[key].ip = e.target.value
                                                updateChannels(chl)
                                            }}></Form.Control></td>
                                            <td>
                                                <Form.Check disabled={streamState} defaultChecked onChange={(e) => {
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
                        <button disabled={isSubmitting || props.otherAdapterScanState} className="btn btn-success">
                            {isSubmitting && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>}
                            Stream
                        </button>
                    </form>
                    <br />
                    <div>
                        {streamState ? <Button className="stop-button" onClick={handleOnStop}>Stop</Button> : null}
                    </div>
                </div>
                :
                <div>
                    <h4 style={{ marginTop: 60, marginBottom: 40, textAlign: 'center' }}>No channels</h4>
                </div>}
        </div>
    )
}

export default Stream;