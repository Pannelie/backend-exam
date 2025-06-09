export function logger(req, res, next) {
  const time = new Date().toDateString();
  const method = req.method;
  const url = req.url;
  console.log(`[${time}] ${method} ${url}`);
  next();
}
