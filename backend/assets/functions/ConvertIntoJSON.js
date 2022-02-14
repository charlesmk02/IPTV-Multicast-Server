const { readFileSync, writeFileSync } = require('fs');
const { error } = require('./Respond')

exports.convertIntoJSON = function (res) {
    try {
        var line = readFileSync('../../channels.conf').toString().split("\n")
        var array = []

        for (i in line) {
            let [
                name,
                frequency,
                inversion,
                bandwidth,
                innerFec,
                fec,
                modulation,
                transmissionMode,
                guardInterval,
                hierarchy,
                vpid,
                audio,
                sid
            ] = line[i].split(':')
            let obj = {
                name,
                frequency,
                inversion,
                bandwidth,
                innerFec,
                fec,
                modulation,
                transmissionMode,
                guardInterval,
                hierarchy,
                vpid,
                audio,
                sid
            }
            array.push(obj)
        }

        var channels = {};
        for (let i = 0; i < array.length; i++) {
            let name = array[i].name;
            channels[name] = {
                frequency: parseInt(array[i].frequency),
                ip: '',
                sid: parseInt(array[i].sid)
            };
        }

        var json = JSON.stringify(channels, null, 2);
        writeFileSync('../backend/assets/channels.json', json)

        return channels

    } catch (err) {
        res.json(error(err.message))
    }
}