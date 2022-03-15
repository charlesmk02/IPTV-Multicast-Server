import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Form, Row, Col } from 'react-bootstrap';
import { postData } from '../Hook/Hook';

const Scan = (props) => {
    const { handleSubmit, formState } = useForm()
    const { isSubmitting } = formState
    const [freq, updateFreq] = useState();
    const [scanState, updateScanState] = useState(false)

    useEffect(() => {
        props.parentCallback2(scanState)
    }, [scanState])

    const handleOnScan = () => {
        return new Promise((resolve, reject) => {
            try {
                var re = new RegExp('^\\d{9}$')
                if (!re.test(freq)) {
                    throw new Error('Invalid frequency')
                } else {
                    updateScanState(true)

                    postData('http://192.168.5.105:9000/scan', {
                        "freq": freq,
                        "adpt": props.adapter
                    })
                        .then(response => {
                            props.parentCallback1({
                                "chl": response["result"],
                                "freq": freq,
                            })
                            updateScanState(false)
                            resolve()
                        })
                        .catch(err => {
                            alert(err.message)
                            console.log(err.message)
                            reject(err)
                        })
                }
            }
            catch (err) {
                alert(err.message)
                console.log(err.message)
                reject(err)
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(handleOnScan)}>
            <Row className="form-rows">
                <Col sm={6}>
                    <br />
                    <Form.Label className="form-label">Frequency :
                        <Form.Control disabled={isSubmitting || props.streamState} type="text" placeholder="123456789" onChange={(e) => updateFreq(parseInt(e.target.value))} />
                    </Form.Label>
                    <br />
                    <button disabled={isSubmitting || props.otherAdapterScanState || props.streamState || props.otherAdapterStreamState} className="btn btn-primary mr-1">
                        {isSubmitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        Scan
                    </button>
                    <br />
                </Col>
            </Row>
        </form>
    )
}

export default Scan;