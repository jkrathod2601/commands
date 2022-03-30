const express= require('express')
const router = new express.Router()
const jwt=require('jsonwebtoken')
const crypto= require("crypto")


const refreshtoken=async(req,res)=>{
    // if access token expire then only give refresh token
    try{
        const data_token=await jwt.verify(req.signedCookies["refresh_token"],req.cookies["_csrf"])
        let refreshtoken=jwt.sign({username:data_token.username,age:"26"},req.cookies["_csrf"],{expiresIn:"1h"})
        let accesstoken=jwt.sign({username:data_token.username,role:"admin"},framework.jwtkey,{expiresIn: "1h"})
        res.cookie("refresh_token",refreshtoken,{ maxAge: 3650*24*60*60, httpOnly: true,signed: true})
        res.cookie('access_token',accesstoken,{ maxAge: 3650*24*60*60, httpOnly: true,signed: true})
        console.log(framework.chalk.green("successfully generated new refresh token"))
        res.send(accesstoken)
    }catch(err){
        console.log(framework.chalk.red(err))
    }
}

const login = (req,res)=>{
    console.log(req.body)
    if(req.body.username=="jay" && req.body.role=="2601"){
        // console.log(req.cookies["_csrf"])
        let refreshtoken=jwt.sign({username:req.body.username},req.cookies["_csrf"],{expiresIn: "1h"})
        let accesstoken=jwt.sign({username:req.body.username,role:"admin"},framework.jwtkey,{expiresIn: "1h"})
        res.cookie("refresh_token",refreshtoken,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
        res.cookie('access_token',accesstoken,{ maxAge: 3650*24*60*60, httpOnly: true,signed: true})
        res.render('index',{
            title: 'jay'
        })
    }else{
        res.render('login',{title:"enter right username",csrftoken:req.csrfToken()})
    }
}

router.post('/loginuserdata',login)

router.get('/refresh',refreshtoken)

module.exports = router;