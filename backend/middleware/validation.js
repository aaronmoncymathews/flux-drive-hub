const validation = (schema) => {
  return (req, res, next) => {
    // Determine which data to validate based on method
    const dataToValidate = req.method === 'GET' ? req.query : req.body;
    
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        error: 'Validation failed',
        details: errorMessages
      });
    }

    // Replace the original data with sanitized and validated data
    if (req.method === 'GET') {
      req.query = value;
    } else {
      req.body = value;
    }

    next();
  };
};

module.exports = validation;