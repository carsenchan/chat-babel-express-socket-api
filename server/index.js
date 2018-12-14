const server = require('http').createServer();
const io = require('socket.io')(server);
const mongoose = require('mongoose');
require('dotenv').config();
import {newMbRight} from './mongoose/mbRightManager';

import socket from './socket';

const port = process.env.PORT || 4002;

mongoose.connect(process.env.mongoConn || 'mongodb://localhost:27017/', { useNewUrlParser: true })
.then(async ()=> {
  console.log('DB Connnected');
  const mySocket = await socket(server);

  if(mySocket.isActive){
    console.log(mySocket.message);
  } else {
    throw mySocket.error;
  }

  server.listen(port, ()=>{
    
    console.log(`Server Started on PORT: ${port}`);
  });
})
.catch(error=>console.log(error));

