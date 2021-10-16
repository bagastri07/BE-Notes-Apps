/**
 *
 * @param {Object} res express res
 * @param {Number} status status code
 * @param {Boolean} success success or not
 * @param {String} message message for response
 * @param {Object} data data
 */
 const response = (res, status, success, message, data = {}) => {
	return res.status(status).json({
		success: success,
		message: message,
		data: data,
	})
}

module.exports = response
