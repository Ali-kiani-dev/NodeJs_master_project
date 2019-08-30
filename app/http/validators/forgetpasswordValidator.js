const validator = require('./validator');
const { check } = require('express-validator');

class forgetpasswordValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('فرمت ایمیل معتبر نمی باشد'),
        ]
    }
}

module.exports = new forgetpasswordValidator();