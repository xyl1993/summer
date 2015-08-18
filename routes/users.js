var express = require('express');
var aboutDao = require('../dao/aboutDao');
var router = express.Router();

/*以下是路由配置*/

/* GET home page. */
// router.get('/',checkLogin);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('ghost/login.html')
});
router.get('/ghost', function(req, res, next) {
  res.render('ghost/ghost.html');
});

/*路由配置end*/

/*
请求配置*/
// router.post('/about',checkNotLogin);
router.post('/about',function(req,res,next){
	console.log('aasss');
	var user = aboutDao.queryAll(req, res, next);
	user.read(function(err,result){
        if(err) {
            res.status(404).end(err);
        }else{
             res.render('bbs', {
                 items: result
             });
        }
    });
});

module.exports = router;


