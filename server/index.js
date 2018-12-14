import express from 'express';

const app = new express();

const server = require('http').Server(app);
//const io = require('socket.io')(server);
const mongoose = require('mongoose');
require('dotenv').config();
import {newMbRight} from './mongoose/mbRightManager';

import socket from './socket';
import api from './api';

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

  // API Setup
  api(app);

  // Server Port Setup
  server.listen(port, ()=>{
    
    console.log(`Server Started on PORT: ${port}`);
  });
})
.catch(error=>console.log(error));

