/**
 * This function writes the channels streamed in a JSON File.
 * The name of the file depends on the adapter selected.
 */

const { writeFileSync } = require('fs')

exports.writeStream = function (req) {
    try {
        var json = JSON.stringify(req.body, null, 2);
        writeFileSync(`/home/pi/stream${req.body.adpt}.json`, json)

    } catch (err) {
        throw err
    }
}