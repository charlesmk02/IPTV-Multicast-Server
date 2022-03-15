import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Scan from './Scan';
import Stream from './Stream';

const Adapter1 = (props) => {
    const [channels, updateChannels] = useState({})
    const [freq, updateFreq] = useState()

    return (
        <div>
          <h4 style={{ marginTop: 60 }}>Adapter1</h4>
            <div>
              <Scan parentCallback={(childData) => {
                updateFreq(childData["freq"])
                updateChannels(childData["chl"])
              }} />
            </div>
            <br />
            <div>
              {Object.entries(channels).length != 0 ?
                <Stream channels={channels} freq={freq} adapter={1} />
                :
                <div>
                  <h4 style={{ marginTop: 60, marginBottom: 40, textAlign: 'center' }}>No channels</h4>
                </div>
              }
            </div>
        </div>
      );
}

export default Adapter1;