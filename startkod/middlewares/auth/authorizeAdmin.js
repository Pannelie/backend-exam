export function adminMiddleware(req, res, next) {
  if (!global.user) {
    return next({ status: 401, message: `No user logged in` });
  }
  if (req.user.role !== `admin`) {
    return next({ status: 403, message: `Access denied, only available for admin` });
  }
  next();
}
