const express= require('express')
const router = new express.Router()
const jwt=require('jsonwebtoken')
const crypto= require("crypto")


const login = async(req,res)=>{
    try{
       let refreshtoken_user=jwt.sign({username:req.body.username},req.cookies["_csrf"],{expiresIn: "2h"})
       await db[modelname].create({
            name:req.body.username,
            role:req.body.role,
            refreshtoken:refreshtoken_user,
            key:crypto.randomBytes(16).toString('hex')
        }).then((data)=>{
            let accesstoken_user=jwt.sign({username:req.body.name,role:req.body.role,uid:data.dataValues.id},framework.jwtkey,{expiresIn: "1h"})
            res.cookie("refresh_token",refreshtoken_user,{ maxAge:3650*24*60*60, httpOnly: true ,signed: true})
            res.cookie("access_token",accesstoken_user,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
            res.render('index',{title: req.body.username})
            console.log(framework.chalk.green("useradded successfully"))
        })
    }catch(e){
        console.log(framework.chalk.red(e))
    }
}

const refreshdatabase=async(req,res)=>{
    try{
        let key_id=req.params.id
    await db[modelname].findAll({where:{key:key_id},raw:true}).then((data)=>{
        if(data.length==1){
            // console.log(data[0].refreshtoken)
            // console.log(req.signedCookies["refresh_token"])
            if(data[0].refreshtoken==req.signedCookies["refresh_token"]){
                const data_token=jwt.verify(req.signedCookies["refresh_token"],req.cookies["_csrf"])
                console.log(data_token)
                let access_token=jwt.sign({role:data[0].role,uid:data[0].id,username:data[0].name},framework.jwtkey,{expiresIn: "1h"})
                console.log(access_token)
                let refresh_token=jwt.sign({uid:data[0].id},req.cookies["_csrf"],{expiresIn: "2h"})
                console.log(refresh_token)
                db[modelname].update({refreshtoken:refresh_token,key:crypto.randomBytes(16).toString('hex')},{where:{key:key_id}}).
                then((data)=>{
                    res.cookie("refresh_token",refresh_token,{ maxAge:3650*24*60*60, httpOnly: true ,signed: true})
                    res.cookie("access_token",access_token,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
                    res.send("refresh token updated successfully")
                })
            }else{
                res.send("second try for authentication you logout from all devices")
            }
        }else{
            res.end("access denied");
        }
    })
    }
    catch(err){
        console.log(framework.chalk.red(err))
    }
}


router.post('/loginuserdata',login)

router.get('/refreshtokendatabase/:id',refreshdatabase)

module.exports = router;