exports.success = function (result) {
    return {
        status: 'success',
        result: result
    }
}

exports.error = function (message) {
    return {
        status: 'error',
        message: message
    }
}