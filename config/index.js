const service = require('./service');
const layout = require('./layout');
const session = require('./session');
const database = require('./database');


module.exports = {
    service,
    session,
    layout,
    database,
    debug : true,
    jwt : {
        secretkey : 'asd#SDAS%ASDA!asA'
    }
}