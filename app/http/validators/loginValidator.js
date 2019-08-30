const validator = require('./validator');
const { check } = require('express-validator');

class loginValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('فرمت ایمیل معتبر نمی باشد'),
            check('password')
                .isLength({ min: 8 })
                .withMessage('پسورد نباید کمتر از 8 کارکتر باشد')
        ]
    }
}

module.exports = new loginValidator();