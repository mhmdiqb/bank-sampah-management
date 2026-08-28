/**
 * Async error wrapper.
 * Why: Menghindari try-catch berulang di setiap controller.
 * Error dilempar ke global error handler middleware.
 */
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
