function errorHandler(err, req, res, next) {
  if (err) {
    // console.log(err)
    res.status(500).send({message: err.message});
  } else {
    next();
  }
}

export default errorHandler;
