const adminAccess = (req, res, next) => {
  console.log("::: [Middleware] Admin Access");

  try {
    if (req.user && req.user.role === "admin") return next();
  } catch (error) {
    next(error);
  }
};

export default adminAccess;
