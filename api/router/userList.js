const db=require('../modules/db');
const common = require("../modules/common");
const userGrade = require("../modules/grade");
const md5=require("md5");

module.exports.userLogin = function(req,res){
    db.findOne("studentList",{
        stuName:req.query.userName,
        stuNum:req.query.userNum/1,
        stuGrade:req.query.userGrade
    },function(err,userInfo){
        if(userInfo){
            res.json({
                ok:1,
                msg:"登录成功",
                userName:userInfo.stuName,
                userNum:userInfo.stuNum/1
            })
        }else{
            res.json({
                ok:2,
                msg:"姓名和学号不匹配！"
            })
        }
    })
}

module.exports.getUserInfo = function(req,res){
    db.findOne("userList",{
        userNum:req.query.userNum/1
    },function(err,userInfo){
        res.json({
            ok:1,
            userInfo,
            userGrade:userGrade.userGrade
        })
    })
}