var express = require('express');
var router = express.Router();

var controller=require("../controllers/controller");

/* GET home page. */
router.get('/', controller.homePage);
router.post('/books_data',controller.getTableData);
router.post('/books_update',controller.updateTable);
router.post('/update_db',controller.updateDB);

module.exports = router;
