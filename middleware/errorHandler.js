function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err)
    res.status(err.error.status).send({ message: err.error.message });
  } else {
    next();
  }
}

export default errorHandler;
