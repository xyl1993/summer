var express = require('express');
var router = express.Router();

/*以下是路由配置*/

/* GET home page. */
// router.get('/',checkLogin);
router.get('/', function(req, res, next) {
	res.render('index.html')
});

router.get('/home', function(req, res, next) {
	res.render('home.html')
});

router.get('/about-me', function(req, res, next) {
	res.render('about-me.html')
});

router.get('/experience', function(req, res, next) {
  res.render('experience.html')
});

router.get('/skills', function(req, res, next) {
  res.render('skills.html')
});

// router.get('/', function (req, res) {
//   if (db) {
//     var col = db.collection('counts');
//     // Create a document with request IP and current time of request
//     col.insert({ip: req.ip, date: Date.now()});
//     col.count(function(err, count){
//       res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
//     });
//   } else {
//     res.render('index.html', { pageCountMessage : null});
//   }
// });

router.get('/pagecount', function (req, res) {
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count +'}');
    });
  } else { 
    res.send('{ pageCount: -1 }');
  }
});

router.get('/about-me',function(req,res,next){
	res.render('/about-me');
});

// router.post('/about',function(req,res,next){
//   console.log('aasss');
//   aboutDao.queryAll(req, res, next);
// });

/*路由配置end*/

module.exports = router;


