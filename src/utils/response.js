const response = (res, status, success, message, results, pageInfo) => {
	// success = success || true
	// message = message || ''
	const returnData = {
	  success,
	  message,
	  pageInfo
	}
	if (status >= 400) {
	  returnData.success = false
	} else {
	  status = 200
	}
	if (results !== null) {
	  returnData.results = results
	}
	return res.status(status).json(returnData)
  }

  module.exports = { response };  