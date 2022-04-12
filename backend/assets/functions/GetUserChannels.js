/**
 * This function sorts the obj parameter that includes all the channels
 * and returns an object containing only
 * the channels that are in the frequency set by the user.
 */

exports.getUserChannels = function (req, obj) {
    try {
        var userChannels = {}
        for (channel in obj) {
            if (obj[channel].frequency == req.body.freq) {
                userChannels[`${channel}`] = obj[channel]
            }
        }

        return userChannels

    } catch (err) {
        throw err
    }
}