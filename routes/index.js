var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/quizzes', 				quizController.index);
router.get('/quizzes/:quizId(\\d+)',		quizController.show);
router.get('/quizzes/:quizId(\\d+)/check',	quizController.check);
router.get('/autor', 				quizController.autor);

module.exports = router;
