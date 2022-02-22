exports.getUserChannels = function (req, obj) {
    return new Promise((resolve, reject) => {
        try {
            var data = obj
            var userChannels = {}
            for (channel in data) {
                if (data[channel].frequency == req.body.freq) {
                    userChannels[`${channel}`] = data[channel]
                }
            }
            resolve(userChannels)
    
        } catch (err) {
            reject(err)
        }  
    })
}