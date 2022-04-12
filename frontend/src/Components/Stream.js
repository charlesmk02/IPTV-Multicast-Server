import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Form, Table } from 'react-bootstrap';
import postData from '../Hook/postData';

const Stream = (props) => {
    const { handleSubmit, formState } = useForm()
    const { isSubmitting } = formState
    const [channelsScanned, setChannelsScanned] = useState(props.channelsScanned)
    const [streamState, setStreamState] = useState(false)
    const [protocol, setProtocol] = useState('RTP')
    const [channelsStreamed, setChannelsStreamed] = useState({})
    const [otherAdapterChannels, setOtherAdapterChannels] = useState({})

    /**
     * This useEffect handles change of the channels scanned by the tuner and 
     * of the multicast addresses of the other Adapter component.
     * Whenever the state of the stream or the channels streamed change,
     * we pass the data to the Adapter component.
     */
    
    useEffect(() => {
        setChannelsScanned(props.channelsScanned)
        setOtherAdapterChannels(props.otherAdapterChannels)
        props.parentCallback1(streamState)
        props.parentCallback2(channelsStreamed)
    }, [props.channelsScanned, props.otherAdapterChannels, streamState, channelsStreamed])

    /**
     * We use this function to prevent duplicates of multicast addresses
     */

    const hasDuplicates = (array) => {
        return (new Set(array)).size !== array.length;
    }

    const handleOnStart = () => {
        return new Promise((resolve, reject) => {

            /**
             * Errors handling
             */
            
            try {

                /**
                 * No channels selected
                 */
                
                var obj = {}
                for (let key in channelsScanned) {
                    if (channelsScanned[key].checked) {
                        obj[`${key}`] = channelsScanned[key]
                    }
                }

                if (Object.entries(obj).length === 0) {
                    throw new Error('No channels selected')
                }

                /**
                 * Invalid multicast addresses
                 */

                var re = /^2(?:2[4-9]|3\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)){3}:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
                for (let key in obj) {
                    if (!re.test(obj[key].ip)) {
                        throw new Error('Invalid multicast address(es)')
                    }
                }

                /**
                 * Duplicates of mutlicast addresses
                 */

                let array1 = Object.entries(obj)
                let addresses = []
                for (let i = 0; i < array1.length; i++) {
                    addresses.push(array1[i][1].ip)
                }
                let array2 = Object.entries(otherAdapterChannels)
                for (let i = 0; i < array2.length; i++) {
                    addresses.push(array2[i][1].ip)
                }
                console.log(addresses)
                if (hasDuplicates(addresses)) {
                    throw new Error('Repeated address(es)')
                }

                let data = {
                    "adpt": props.adapter,
                    "chl": obj,
                    "freq": props.frequency,
                    "proto": protocol
                }

                setStreamState(true)
                setChannelsStreamed(obj)

                /**
                 * POST request to the server
                 */

                postData('http://192.168.5.105:9000/start-stream', data)

                    /**
                     * The promise is resolved when the stream is terminated
                     */

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
            {Object.entries(channelsScanned) != 0 ?
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
                                {Object.keys(channelsScanned).map((key, i) => {
                                    return (
                                        <tr className="entreprise" key={channelsScanned[key].sid}>
                                            <td>{key}</td>
                                            <td><Form.Control disabled={streamState} type="text" placeholder="IP:PORT" onChange={(e) => {
                                                let chl = { ...channelsScanned };
                                                chl[key].ip = e.target.value
                                                setChannelsScanned(chl)
                                            }}></Form.Control></td>
                                            <td>
                                                <Form.Check disabled={streamState} defaultChecked onChange={(e) => {
                                                    let chl = { ...channelsScanned };
                                                    chl[key].checked = e.target.checked
                                                    setChannelsScanned(chl)
                                                }}>
                                                </Form.Check>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <button disabled={isSubmitting} className="btn btn-success">
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