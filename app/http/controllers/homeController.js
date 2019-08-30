const controller = require('./controller');
const Course = require('app/models/course');
const Category = require('app/models/category');
const Article = require('app/models/article');
const Episode = require('app/models/episode');
const Comment = require('app/models/comment');
const path = require('path');
const bcrypt = require('bcrypt');

const moment = require('moment-jalaali');
moment.loadPersian({usePersianDigits : true , dialect : 'persian-modern'});

class homeController extends controller {
    async index(req, res) {
        const courses = await Course.find({}).sort({ createdAt: 1 }).limit(3).exec();
        const articles = await Article.find({}).sort({ createdAt: 1 }).limit(3).exec();
        res.render('index', { courses, articles });
    }

    async coursePage(req, res, next) {
        const course = await Course.findOneAndUpdate({ slug: req.params.course }, { $inc : { viewCount : 1 }}).populate([{
            path : 'user',
            select : 'name'
        } , {
            path : 'episodes'
        }, {
            path : 'comments',
            match : {
                check : true,
                parent : null
            },
            populate : [{
                path : 'user',
                select : 'name'
            }, {
                path : 'comments',
                match : {
                    check : true
                },populate : {
                    path : 'user',
                    select : 'name'
                }
            }]
        },

    
    ]).exec();

        const categories = await Category.find({parent : null}).populate('childs').exec();
        // return res.json(categories);

    
        res.render('home/page/coursePage', { course, categories});
    }

    async articlePage(req, res, next) {
        const article = await Article.findOneAndUpdate({ slug: req.params.article }, { $inc : { viewCount : 1 }}).populate([{
            path : 'user',
            select : 'name'
        } , {
            path : 'comments',
            match : {
                check : true,
                parent : null
            },
            populate : [{
                path : 'user',
                select : 'name'
            }, {
                path : 'comments',
                match : {
                    check : true
                },populate : {
                    path : 'user',
                    select : 'name'
                }
            }]
        },

    
    ]).exec();

        const categories = await Category.find({parent : null}).populate('childs').exec();
        res.render('home/page/articlePage', { article, categories });
    }


    async download(req, res){
        const episode = await Episode.findById(req.params.id);
        if(! episode) return res.json('چنین ویدیویی برای این دوره وجود ندارد');
        if(! this.checkSecretUrl(req, episode)){
            return res.json('لینک دانلود اعتبار لازم را ندارد')
        }

        episode.inc('downloadCount');

        const filePath = await path.resolve(`./public/${episode.videoUrl}`);
        res.download(filePath);
    }

    checkSecretUrl(req, episode){
        const time = new Date().getTime();
        if(req.query.t < time) {
            return res.json('لینک دانلود اعتبار لازم را ندارد')
        }
        const secret = `asdqwoidjopedm!@sdfwe#asd%${episode.id}${req.query.t}`
        return bcrypt.compareSync(secret, req.query.secret);
    }
}

module.exports = new homeController();