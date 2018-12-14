import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

let router = express.Router();

export const TOKEN_SECRET = 'IAM5ECRET$$';

router.post('/login', (req, res, next)=>{

  passport.authenticate('local', {session: false}, (err, user, info)=>{
    if(err || !user){
      // Cannot pass auth
      return res.status(400).json({
        err
      });
    }

    req.login(user, {session: false}, error=>{
      if(error){
        res.send(error);
      }
      const output = {
        id: user._id,
        email: user.email,
        lastUpdate: user.lastUpdate.toString()
      }
      console.log(output);
      // Generate token
      const token = jwt.sign(output, TOKEN_SECRET);
      // response as pass auth
      return res.json({output, token});
    });

  })(req, res);
});

export default router;