var express = require('express');
var router = express.Router();

var controller=require("../controllers/controller");
<<<<<<< HEAD
var auth= require("../controllers/auth");

/* GET home page. */
router.get('/',auth.isLoggedIn,controller.homePage);
router.post('/books_data',controller.getTableData);
router.post('/books_update',controller.updateTable);
router.post('/update_headings',controller.updateDateHeading);
router.post('/update_db',controller.updateDB);
router.get('/login',auth.loginPage);
router.post('/login',auth.login);
router.post('/register',auth.registerUser);

router.post('/logout',auth.logout);
=======

/* GET home page. */
router.get('/', controller.homePage);
router.post('/books_data',controller.getTableData);
router.post('/books_update',controller.updateTable);
>>>>>>> 8008b9e091b310b4513cd5a0add2883eeaa576ad

module.exports = router;
