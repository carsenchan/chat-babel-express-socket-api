import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res)=>{
  res.json({
    message: 'hello'
  })
})

userRouter.get('/profile', (req, res)=>{
  res.send(req.user);
});

export default userRouter;