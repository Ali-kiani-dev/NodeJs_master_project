const validator = require('./validator');
const { check } = require('express-validator');

class registerValidator extends validator {
    handle() {
        return [
            check('name')
                .isLength({ min: 5 })
                .withMessage('نام نباید کمتر از 5 کارکتر باشد'),
            check('email')
                .isEmail()
                .withMessage('فرمت ایمیل معتبر نمی باشد'),
            check('password')
                .isLength({ min: 8 })
                .withMessage('پسورد نباید کمتر از 8 کارکتر باشد')
        ]
    }
}

module.exports = new registerValidator();