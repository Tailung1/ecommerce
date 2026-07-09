export default function errorHandler(err, req, res) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Something went wrong";
  res.status(statusCode).json({ message });
}
