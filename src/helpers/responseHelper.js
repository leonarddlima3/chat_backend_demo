const self = module.exports = {
  delegate: (res) => function (err, data, statusCode, statusMessage) {
    self.sendResponse(err, data, res, statusCode, statusMessage);
  },
  sendResponse: (err, data, res, statusCode, statusMessage) => {
    if (err) {
      self.sendError(err, res, statusCode, statusMessage);
    } else {
      self.sendSuccess(data, res, statusCode, statusMessage);
    }
  },
  sendError: (err, res, statusCode, statusMessage) => {
    res.status(statusCode).json({
      statusCode,
      statusMessage,
      error: err,
    });
  },
  sendSuccess: (data, res, statusCode, statusMessage, cookie = false) => {
    if (cookie) {
      res.status(statusCode)
        .cookie('auth', cookie.token)
        .json({
          statusCode,
          statusMessage,
          data,
        });
    } else {
      res.status(statusCode).json({
        statusCode,
        statusMessage,
        data,
      });
    }
    
  },
};
