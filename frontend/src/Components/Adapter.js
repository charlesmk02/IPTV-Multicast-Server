import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Scan from './Scan';
import Stream from './Stream';

const Adapter = (props) => {
    const [channels, updateChannels] = useState({})
    const [freq, updateFreq] = useState()
    const [streamState, updateStreamState] = useState(false)
    const [scanState, updateScanState] = useState(false)

    useEffect(() => {
        props.grandParentCallback1(scanState)
        props.grandParentCallback2(streamState)
    }, [scanState, streamState])

    return (
        <div>
            {<h4 style={{ marginTop: 30 }}>Adapter{props.adapter}</h4>}
            <div>
                <Scan parentCallback1={(childData) => {
                    updateFreq(childData["freq"])
                    updateChannels(childData["chl"])
                }} parentCallback2={(childData) => {
                    updateScanState(childData)
                }} adapter={props.adapter} streamState={streamState} otherAdapterScanState={props.otherAdapterScanState} otherAdapterStreamState={props.otherAdapterStreamState} />
            </div>
            <br />
            <div>
                {!scanState ?
                    <Stream parentCallback={(childData) => {
                        updateStreamState(childData)
                    }} channels={channels} freq={freq} adapter={props.adapter} otherAdapterScanState={props.otherAdapterScanState} />
                    :
                    null
                }
            </div>
        </div>
    );
}

export default Adapter;