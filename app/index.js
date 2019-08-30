const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session  = require('express-session');
const methodOverride = require('method-override');
const Helper = require('./helper');
const rememberLogin =  require('app/http/middleware/rememberLogin');
const chatController = require('app/http/controllers/chat/chatController');
const access = require('app/accessUser');
const socketIo = require('socket.io');


const app = express();


module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress(){
        const server = http.createServer(app);
        const io = socketIo(server);
        chatController.connectToSocket(io);
        server.listen(3000 , ()=> console.log(`listening on port 3000 ...`))
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url , { useFindAndModify : false });
    }

    setConfig() {
        require('app/passport/passport-local');
        require('app/passport/passport-google');
        app.use(express.static(config.layout.PUBLIC_DIR));
        app.set('view engine' , config.layout.VIEW_ENGINE);
        app.set('views' , config.layout.VIEW_DIR); 
        app.use(config.layout.EJS.expressLayouts);
        app.set('layout' , config.layout.EJS.master);
        app.set("layout extractScripts", config.layout.EJS.layoutScripts);
        app.set("layout extractStyles", config.layout.EJS.layoutStyles);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
        app.use(session({...config.session}));
        app.use(cookieParser('secretID'));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use((req, res,next)=>{
            app.locals = new Helper(req, res).object();
            next();
        })
        
        app.use(methodOverride('_method'));
        app.use(rememberLogin.handle);
        app.use(access.middleware());
    }

    setRouters(){
        app.use(require('app/routes/web'));
        app.use(require('app/routes/api'));
    }
}