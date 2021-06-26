const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const Entreprise = require("./models/entreprise");
const jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy(async (token, done) => {
    const tokenData = await jwt.verify(token, 'secret');
    console.log(tokenData);
   
    const entreprise = await Entreprise.findOne({ _id: tokenData.userId }); 
    if (!entreprise) {
      return done(null, false);
    } else {
      return done(null, entreprise);
    }
  })
);