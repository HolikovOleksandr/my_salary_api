const ownerAndAdminAccess = async (req, res, next) => {
  console.log("::: [Middleware] Owner Access");

  try {
    const userId = req.user.id;

    const resourceId = req.params.id;

    if (req.user.role === "admin") return next();

    const resource = await User.findById(resourceId);
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    }

    if (resource.id !== userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default ownerAndAdminAccess;
