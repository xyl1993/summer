// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./mapping/aboutMapping');
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [req.body.username, req.body.password], function(err, result) {
				log.debug(result);
				if(result) {
					// result = {
					// 	code: 200,
					// 	msg:'增加成功'
					// };
					res.redirect('/login');    
				}
 				
				// 以json形式，把操作结果返回给前台页面
				// jsonWrite(res, result);

 
				// 释放连接 
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}
 
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}
 
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		// var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByNameAndPwd, [req.body.user, req.body.password], function(err, rows,result) {
				log.debug(rows);
				var resMap = {};
				var id = rows[0].id+'';
				// jsonWrite(res, result);
				if(id){
					connection.query($sql.queryById,id,function(err,result){
						log.debug(result);
						var user={
							username : result[0].name
						};
						req.session.user = user;
						log.debug(req.session.user);
						resMap.code=0;
						resMap.data=result[0];
						res.send(resMap);  
					})
				}else{
					req.session.error = '用户名密码不正确';
					return res.redirect('/login');
				}
				connection.release();
				// return result;
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				console.log(result);
				callback(err,result);
				connection.release();
			});
		});
	}
 
};