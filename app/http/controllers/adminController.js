const controller = require('app/http/controllers/controller');
const User = require('app/models/users');
class adminController extends controller{
    async index(req, res, next){
        res.render('admin/index')
    }
}

module.exports = new adminController();