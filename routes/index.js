var express = require('express');
var router = express.Router();

var controller=require("../controllers/controller");

/* GET home page. */
router.get('/', controller.homePage);
router.post('/books_data',controller.getTableData);
router.post('/books_update',controller.updateTable);

module.exports = router;
