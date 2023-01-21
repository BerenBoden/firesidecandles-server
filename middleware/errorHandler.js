function errorHandler(err, req, res, next) {
  if (err) {
    res.status(err.error.status).send({ message: err.error.message });
  } else {
    next();
  }
}

export default errorHandler;
