import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Button, Form, Table } from 'react-bootstrap';
import { postData } from '../Hook/Hook';

const Stream = (props) => {
    const { handleSubmit, formState } = useForm()
    const { isSubmitting } = formState
    const [channels, updateChannels] = useState(props.channels)
    const [streamState, setStreamState] = useState(false)

    useEffect(() => {
        updateChannels(props.channels)
    },[props.channels])

    const hasDuplicates = (array) => {
        return (new Set(array)).size !== array.length;
    }

    const handleOnStart = () => {
        return new Promise((resolve, reject) => {
            try {
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
                    "freq": props.freq,
                    "chl": obj
                }

                postData('http://192.168.5.105:9000/start-stream', data)
                    .then(() => resolve())
                    .catch(err => { throw err })
                
                setStreamState(true)
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
            .then(response => response.json())
            .then(() => {
                setStreamState(false)
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div>
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
                    {isSubmitting && <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>}
                    Stream
                </button>
            </form>
            <br />
            <div>
                {streamState ? <Button className="stop-button" onClick={handleOnStop}>Stop</Button> : null}
            </div>
        </div>
    )
}

export default Stream;