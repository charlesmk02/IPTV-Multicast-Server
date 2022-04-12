/**
 * Response handling
 */

exports.success = function (result) {
    return {
        status: 'success',
        result: result
    }
}
