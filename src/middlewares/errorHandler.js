const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  switch (err.name) {
    case "ValidationError":
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(err.errors).map((error) => error.message),
      });

    case "CastError":
      return res.status(400).json({
        success: false,
        message: "Invalid data format",
      });

    case "JsonWebTokenError":
      return res.status(401).json({
        success: false,
        message: "Invalid or missing token",
      });

    case "TokenExpiredError":
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });

    default:
      return res.status(500).json({
        success: false,
        message: "Something broke!",
      });
  }
};

export default errorHandler;
