const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
.is().min(6)
.is().max(80)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['Password123','1234', 'azeqsd','4321', 'aqwzsx']);

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      error: passwordSchema.validate(req.body.password, { list: true }),
    });
  }
};
