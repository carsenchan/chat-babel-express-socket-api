const server = require('http').createServer();
const io = require('socket.io')(server);
const mongoose = require('mongoose');
require('dotenv').config();
import {newMbRight} from './mongoose/mbRightManager';

const port = process.env.PORT || 4002;

let chatrooms = [];

io.on('connection', (socket)=>{
  console.log('One Client Connected', socket.id);

  socket.on('getClientCount', ()=>{
    console.log(socket.id, 'Someone Want to Get Count');
  });

  socket.on('register', ()=>{
    console.log(socket.id, 'register');
  })

  socket.on('join', (roomName)=>{
    console.log('join');
    chatrooms.push(roomName);
    socket.join(roomName);
    socket.emit('chatrooms', socket.rooms);
    socket.broadcast.to(roomName).emit('message', `One person (ID: ${socket.id}) join the room: ${roomName}`);
    //socket.to(roomName).emit('message', `One person join sothe room: ${roomName}`);
  })

  socket.on('leave', ()=>{
    console.log('leave')
    
  })

  socket.on('message', ({roomName, message})=>{
    console.log('message');
    console.log({roomName, message})
    socket.broadcast.to(roomName).emit('message', message)
  })

  socket.on('chatrooms', ()=>{
    console.log('chatrooms')
    socket.emit('chatrooms', socket.rooms);
  })

  socket.on('availableUsers', ()=>{
    console.log('getAvailableUsers')
  })

  socket.on('testing', (data)=>{
    socket.emit('getTesting', {...data, name: 'carsen'})
    socket.broadcast.emit('getTesting', {...data, name: 'carsen'});
  })

  socket.on('disconnect', ()=>{
    console.log('One Client Disconnect');
  });

  socket.on('error', (error)=>{
    console.log(socket.id, error)
    
  })
});


mongoose.connect(process.env.mongoConn || 'mongodb://localhost:27017/', { useNewUrlParser: true })
.then( ()=> {
  console.log('DB Connnected');
  server.listen(port, ()=>{

    console.log(`Server Started on PORT: ${port}`);
  });
})
.catch(error=>console.log(error));

