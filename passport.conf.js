const dotenv = require("dotenv").config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./user.model");

const ser_deser = async()=>{
    passport.serializeUser(async(user, done)=>{
        return done(null,user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        const googleuser = await User.findById(id)
        if(googleuser){
            return done(null,googleuser)
        }
    })
} 

const passportGoogle = async()=>{
    passport.use(new googleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'http://localhost:4000/api/users/auth/google/callback'
    },async(accessToken, refreshToken, profile, done)=>{
        console.log('test');
        try {
            const user = await User.findOne({googleId:profile.id})
            if(user){
                return done(null,user)
            }
            const newUser = new User({
                username: profile.displayName,
                googleId:profile.id,
                email:profile._json.email
            })
            await newUser.save()
            done(null,newUser)
        } catch (error) {
            console.log(error);
        }
    }))
} 

module.exports = {
    ser_deser,
    passportGoogle,
}
