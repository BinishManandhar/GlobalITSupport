var express = require('express');
var employee = require('../model/employees');

var router = express.Router();

router.get('/',function(req,res){
    res.render('login',{layout:'nondefault'});
});

router.get('/signup',function(req,res){
    res.render('signup',{layout:'nondefault'});
});

router.post('/',function(req,res,next){
    employee.authenticate(req,res,function(err,user){
        if(err || ! user)
            res.redirect('/error');
            // next(err);
        else
            res.redirect('/index');
    })

});

router.post('/signup',function(req,res,next){

    employee.enterNewEmployee(req,res,function(result,err){
        if(err == null)
            res.redirect('/');
        else
            next(err);
    })

    });

router.get('/error',function(req,res,next){
    res.render('unauthorized',{message:"Username/Password Invalid", layout: 'nondefault' });
})

module.exports = router;