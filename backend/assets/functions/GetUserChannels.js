const { success, error } = require('./Respond')

exports.getUserChannels = function (req, res, obj) {
    try {
        var data = obj
        var userChannels = {}
        for (channel in data) {
            if (data[channel].frequency == req.body.freq) {
                userChannels[`${channel}`] = data[channel]
            }
        }
        res.json(success(userChannels))

    } catch (err) {
        res.json(error(err.message))
    }
}