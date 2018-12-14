import auth from './routers/auth';
import user from './routers/user';
import passport from 'passport';
import bodyParser from 'body-parser';
require('./auth/passport');

export default (app)=>{

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));

  app.get('/testing', (req, res)=>{
    res.status(200).json({
      success: true,
      message: 'Get Something'
    })
  });
  app.use('/auth', auth);

  app.use('/user', passport.authenticate('jwt', {session: false}) ,user);
};