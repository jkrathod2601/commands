const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
let FacebookStrategy=require('passport-facebook').Strategy;
const GitHubStrategy=require('passport-github2').Strategy

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*s
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

// google
passport.use(new GoogleStrategy({
    clientID:"45081452434-1f52haobi69t9s6rv1mskjt042s5586b.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null,profile)
  }
));

// facebook
passport.use(new FacebookStrategy({
  clientID:"658765882005461",
  clientSecret:"d60160bd4fb4ff1b551974ad1de24376",
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken,profile, cb) {
  // console.log(profile.emails[0].value)
  return cb(null,profile)
}
));


// github
passport.use(new GitHubStrategy({
  clientID: "b2a97bdfdb149fd4d991",
  clientSecret:"e06635e0128d50ea5339254b3855285ab6222617",
  callbackURL: "http://localhost:3000/auth/github/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  return cb(null,profile)
}
));