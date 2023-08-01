const axios = require("axios");
const rateLimit = require("axios-rate-limit");

// Create a rate-limited instance of Axios
const apiLimiter = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1000,
});

//setup the security functon for apiLimiter
function setupSecurity(app) {
  app.set("apiLimiter", apiLimiter);
}

module.exports = { setupSecurity, apiLimiter };
