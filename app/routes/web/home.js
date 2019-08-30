const express = require('express');
const router = express.Router();

//Controller
const homeController = require('app/http/controllers/homeController');
const commentController = require('app/http/controllers/comment/commentController');
const courseController = require('app/http/controllers/course/courseController');
const articleController = require('app/http/controllers/article/articleController');



// Home routes
router.get('/' , homeController.index);

router.get('/logout' , (req,res)=>{
    req.logOut();
    res.clearCookie('remember_token');
    res.redirect('/');
})


// course
router.get('/course/:course', homeController.coursePage);
router.get('/download/:id', homeController.download);
router.get('/article/:article', homeController.articlePage);

router.get('/courses', courseController.allCourse);
router.get('/articles', articleController.allArticle);


// comment
router.post('/comment', commentController.comment);

// paymrnt
router.post('/course/payment', courseController.payment);
router.get('/course/payment/callbackurl', courseController.callbackurl);


module.exports = router;