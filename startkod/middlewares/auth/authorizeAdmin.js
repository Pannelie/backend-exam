export function adminMiddleware(req, res, next) {
  console.log(req.user);

  if (!req.user) {
    return next({ status: 401, message: `No user logged in` });
  }
  if (req.user.role !== `admin`) {
    return next({ status: 403, message: `Access denied, only available for admin` });
  }
  next();
}
