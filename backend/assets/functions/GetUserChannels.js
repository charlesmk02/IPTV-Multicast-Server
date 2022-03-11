exports.getUserChannels = function (req, obj) {
    try {
        var data = obj
        var userChannels = {}
        for (channel in data) {
            if (data[channel].frequency == req.body.freq) {
                userChannels[`${channel}`] = data[channel]
            }
        }

        return userChannels

    } catch (err) {
        throw err
    }
}