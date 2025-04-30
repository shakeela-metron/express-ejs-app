const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.render("500", { message: err.message });
    // res.status(err.status).json({ msg: err.message });
  }
  res.render("500", { message: err.message });
  // res.status(500).json({ msg: err.message });
};

export default errorHandler;
