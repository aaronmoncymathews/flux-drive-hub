const mongoSanitize = require('express-mongo-sanitize');

// Generic error handler to prevent information leakage
const errorHandler = (err, req, res, next) => {
  console.error('Security Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.statusCode || 500).json({
    error: isDevelopment ? err.message : 'An error occurred',
    ...(isDevelopment && { stack: err.stack })
  });
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.stripe.com; " +
    "frame-src https://js.stripe.com;"
  );
  
  next();
};

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
  mongoSanitize.sanitize(req.body, {
    replaceWith: '_'
  });
  mongoSanitize.sanitize(req.query, {
    replaceWith: '_'
  });
  mongoSanitize.sanitize(req.params, {
    replaceWith: '_'
  });
  next();
};

// Rate limiting for sensitive endpoints
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 5) => {
  const rateLimit = require('express-rate-limit');
  
  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting in test environment
      return process.env.NODE_ENV === 'test';
    }
  });
};

module.exports = {
  errorHandler,
  securityHeaders,
  sanitizeInput,
  createRateLimiter
};