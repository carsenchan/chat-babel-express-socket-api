import passport from 'passport';
import passportLocal from 'passport-local';
import Client from '../../mongoose/models/clients';

import passportJWT from 'passport-jwt';
import {TOKEN_SECRET} from '../routers/auth';


const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, cb)=>{
    // Find User From MongoDB by email and password
    // Will Return Promise 
    console.log({email, password});
    return Client.findOne({email, password})
    .then(user =>{
      if(!user){
        console.log('cannot find user')
        return cb(null, false, {message: 'Incorrect email or password.'});
      }
      console.log(user);
      return cb(null, user, {message: 'Logged In Successfully'});
    })
    .catch(error=>{
      console.log(error)
      return cb(error)});
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET
},(jwtPayload, cb)=>{
  return Client.findById(jwtPayload.id)
  .then(user=>{
    return cb(null, user);
  })
  .catch(error=>{
    return cb(error);
  })
}));