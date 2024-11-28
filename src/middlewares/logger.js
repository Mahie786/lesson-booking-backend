// Middleware function for logging HTTP requests
const logger = (req, res, next) => {
  // Extract the HTTP method from the request
  const method = req.method;

  // Extract the URL from the request
  const url = req.url;

  // Get the current timestamp in ISO format
  const timestamp = new Date().toISOString();

  // Log the request details to the console
  console.log(`[${timestamp}] ${method} ${url}`);

  // Call the next middleware in the chain
  next();
};

// Export the logger middleware for use in other parts of the application
module.exports = logger;
