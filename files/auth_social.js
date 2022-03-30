const express=require('express')
const router = new express.Router();
const passport =require('passport');
const jwt = require('jsonwebtoken');
const crypto= require("crypto")
require('./passport_setup')


router.get('/', (req, res) => res.send('Example Home page!'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good',(req, res) => res.send(`Welcome mr ${req.user.displayName} and your google id is ${req.user.id}!`))

// Auth google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
 async function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user)
    await framework.service.checksocialauth.googlecheck(req.user._json.email,req.user.id).then(async(data)=>{
      let id_user=data.userid
      let username=data.username
      let role=data.role
      let refreshtoken_user=jwt.sign({username:username},req.cookies["_csrf"],{expiresIn: "2h"})
      let accesstoken_user=jwt.sign({username:username,role:role,uid:id_user},framework.jwtkey,{expiresIn: "1h"})
      await db[modelname].update({refreshtoken:refreshtoken_user,key:crypto.randomBytes(16).toString('hex')},{where:{id:id_user}}).then((data)=>{
        console.log(framework.chalk.green("google set refresf and access token"))
        res.cookie("refresh_token",refreshtoken_user,{ maxAge:3650*24*60*60, httpOnly: true ,signed: true})
        res.cookie("access_token",accesstoken_user,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
        res.render('index',{title:username})
      })
      // res.send(data);
    })
    // res.redirect('/good');
  }
);

// auth github
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failed' }),
  function(req, res) {
    
    res.redirect('/good');
});

// auth facebook
router.get('/auth/facebook',
passport.authenticate('facebook',{ scope:'email'}));

router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
async function(req, res) {
  // Successful authentication, redirect home.
  await framework.service.checksocialauth.facebookcheck(req.user.emails[0].value,req.user.id).then(async(data)=>{
    let id_user=data.userid
    let username=data.username
    let role=data.role
    let refreshtoken_user=jwt.sign({username:username},req.cookies["_csrf"],{expiresIn: "2h"})
    let accesstoken_user=jwt.sign({username:username,role:role,uid:id_user},framework.jwtkey,{expiresIn: "1h"})
    await db[modelname].update({refreshtoken:refreshtoken_user,key:crypto.randomBytes(16).toString('hex')},{where:{id:id_user}}).then((data)=>{
      console.log(framework.chalk.green("facebook set refresf and access token"))
      res.cookie("refresh_token",refreshtoken_user,{ maxAge:3650*24*60*60, httpOnly: true ,signed: true})
      res.cookie("access_token",accesstoken_user,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
      res.render('index',{title:username})
    })
  })
});

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    // res.clearCookie()
    res.clearCookie('access_token');
    res.clearCookie('refresh_token')
    res.redirect('/');
})

module.exports=router;