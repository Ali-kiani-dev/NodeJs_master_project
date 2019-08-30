const express = require('express');
const router = express.Router();
const upload = require('app/uploadImages');

router.use((req, res, next) => {
    res.locals.layout = "admin/master"
    next();
})

//controller
const adminController = require('app/http/controllers/adminController');
const courseController = require('app/http/controllers/course/courseController');
const episodeController = require('app/http/controllers/episode/episodeController');
const commentController = require('app/http/controllers/comment/commentController');
const articleController = require('app/http/controllers/article/articleController');
const categoryController = require('app/http/controllers/category/categoryController');
const profileController = require('app/http/controllers/profile/profileController');
const permissionController = require('app/http/controllers/permission/permissionController');
const roleController = require('app/http/controllers/role/roleController');
const userController = require('app/http/controllers/user/userController');
const chatController = require('app/http/controllers/chat/chatController');





// validator
const courseValidator = require('app/http/validators/courseValidator');
const episodeValidator = require('app/http/validators/episodeValidator');
const articleValidator = require('app/http/validators/articleValidator');
const categoryValidator = require('app/http/validators/categoryValidator');
const permissionValidator = require('app/http/validators/permissionValidator');
const roleValidator = require('app/http/validators/roleValidator');
const registerValidator = require('app/http/validators/registerValidator');

const access = require('app/accessUser');



// middleaware
const fileToField = require('app/http/middleware/fileToField')

router.get('/', adminController.index);
router.get('/course', courseController.index);
router.get('/course/create', courseController.create);
router.post('/course/create', upload.single('images'), fileToField.handle, courseValidator.handle(), courseController.store);
// delete course
router.delete('/course/:id', courseController.destroy);
//edit course
router.get('/course/:id/edit', courseController.edit);
router.put('/course/:id', upload.single('images'), fileToField.handle, courseValidator.handle(), courseController.update);

// episode route
router.get('/episode', episodeController.index);
router.get('/episode/create', episodeController.create);
router.post('/episode/create', episodeValidator.handle(), episodeController.store);
// delete episode
router.delete('/episode/:id', episodeController.destroy);
//edit episode
router.get('/episode/:id/edit', episodeController.edit);
router.put('/episode/:id', episodeValidator.handle(), episodeController.update);

// comment
router.get('/comment', commentController.index);
router.delete('/comment/:id', commentController.destroy);
router.put('/comment/:id/approve', commentController.update);

// article
router.get('/', adminController.index);
router.get('/article', articleController.index);
router.get('/article/create', articleController.create);
router.post('/article/create', upload.single('images'), fileToField.handle, articleValidator.handle(), articleController.store);
// delete article
router.delete('/article/:id', articleController.destroy);
//edit article
router.get('/article/:id/edit', articleController.edit);
router.put('/article/:id', upload.single('images'), fileToField.handle, articleValidator.handle(), articleController.update);

//category
router.get('/category', categoryController.index);
router.get('/category/create', categoryController.create);
router.post('/category/create', categoryValidator.handle(), categoryController.store);
// delete category
router.delete('/category/:id', categoryController.destroy);
//edit category
router.get('/category/:id/edit', categoryController.edit);
router.put('/category/:id', categoryValidator.handle(), categoryController.update);

// profile
router.get('/profile', profileController.index);
router.put('/profile/:id', profileController.updateProfile);


//permission
router.get('/permission', permissionController.index);
router.get('/permission/create', permissionController.create);
router.post('/permission/create', permissionValidator.handle(), permissionController.store);
// delete permission
router.delete('/permission/:id', permissionController.destroy);
//edit permission
router.get('/permission/:id/edit', permissionController.edit);
router.put('/permission/:id', permissionValidator.handle(), permissionController.update);

//role
router.get('/role', roleController.index);
router.get('/role/create', roleController.create);
router.post('/role/create', roleValidator.handle(), roleController.store);
// delete role
router.delete('/role/:id', roleController.destroy);
//edit role
router.get('/role/:id/edit', roleController.edit);
router.put('/role/:id', roleValidator.handle(), roleController.update);

//user
router.get('/user', userController.index);
router.get('/user/create', userController.create);
router.post('/user/create', registerValidator.handle(), userController.store);
// delete user
router.delete('/user/:id', userController.destroy);
//edit user
router.get('/user/:id/edit', userController.edit);
router.put('/user/:id', registerValidator.handle(), userController.update);
// add user role
router.get('/user/:id/userRoles', userController.userRoles);
router.put('/user/:id/addUserRoles', userController.addUserRoles);

router.get('/user/:id/adminAccess', userController.adminAccess);

//chat 
router.get('/chat', chatController.chatForm);
router.get('/chat-room', chatController.chatRoom);



module.exports = router;