import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Form, Row, Col } from 'react-bootstrap';
import postData from '../Hook/postData';

const Scan = (props) => {
    const { handleSubmit, formState } = useForm()
    const { isSubmitting } = formState
    const [frequency, setFrequency] = useState();
    const [scanState, updateScanState] = useState(false)

    /**
     * Whenever the state of the scan changes
     * we pass the data to the Adapter component. 
     */

    useEffect(() => {
        props.parentCallback2(scanState)
    }, [scanState])

    const handleOnScan = () => {
        return new Promise((resolve, reject) => {

            /**
             * Error handling
             */
            
            try {
                var re = new RegExp('^\\d{9}$') // The frequency must be a 9-digit number
                if (!re.test(frequency)) {
                    throw new Error('Invalid frequency')
                } else {
                    updateScanState(true)

                    /**
                     * POST request to the server
                     */

                    postData('http://192.168.5.105:9000/scan', {
                        "freq": frequency,
                        "adpt": props.adapter
                    })

                        /**
                         * When the scan is complete,
                         * we pass the data to the Adapter component.
                         */

                        .then(response => {
                            props.parentCallback1({
                                "chl": response["result"], 
                                "freq": frequency,
                            })
                            updateScanState(false)
                            resolve()
                        })
                        .catch(err => {
                            updateScanState(false)
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
                        <Form.Control disabled={isSubmitting || props.streamState} type="text" placeholder="123456789" onChange={(e) => setFrequency(parseInt(e.target.value))} />
                    </Form.Label>
                    <br />
                    <button disabled={isSubmitting || props.streamState} className="btn btn-primary mr-1">
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