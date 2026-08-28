/**
 * Standardized API response helpers
 * Why: Untuk konsistensi format response API, memudahkan client parsing,
 * dan memastikan error message tidak membocorkan info sensitif.
 */
class ApiResponse {
  static success(res, statusCode, message, data = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, message, data = null) {
    return this.success(res, 201, message, data);
  }

  static paginated(res, message, data, pagination) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination,
    });
  }

  static error(res, statusCode, message, errors = null) {
    // Never expose stack trace in production
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}

module.exports = ApiResponse;
