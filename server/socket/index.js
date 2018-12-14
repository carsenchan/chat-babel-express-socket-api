import socketio from 'socket.io';

export default (server)=>new Promise((resolve, rejects)=>{
  
  try {
    const socketOption = {
      path: '/chat/socket.io'
    };
    //const io = socketio(server, socketOption);
    const ioParent = socketio(server);

    let io = ioParent.of('/socket'); // Custom Namespace

    //let chatrooms = [];
    io.on('connection', (socket)=>{

      console.log(`One Client Connected`, socket.id);

      socket.on('getClientCount', ()=>{
        console.log(socket.id, 'Someone Want to Get Count');
        console.log(socket.rooms);
      });
    
      socket.on('register', ()=>{
        console.log(socket.id, 'register');
      })
    
      socket.on('join', (roomName)=>{
        console.log('join');
        //chatrooms.push(roomName);
        socket.join(roomName);
         
        socket.broadcast.to(roomName).emit('message', `One person (ID: ${socket.id}) join the room: ${roomName}`);
        //socket.to(roomName).emit('message', `One person join sothe room: ${roomName}`);
      })
    
      socket.on('leave', ()=>{
        console.log('leave')
      })

      socket.on('whoami', ()=>{
        const returnMsg = {
          whoami: socket.id
        }
        socket.emit('whoami', returnMsg);
      })
    
      socket.on('message', ({roomName, message})=>{
        
        const messageObj = {roomName, message, sender: socket.id};
        socket.emit('message', messageObj);
        socket.broadcast.to(roomName).emit('message', messageObj);
      })
    
      socket.on('chatrooms', ()=>{
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
    
    resolve({status: 200, isActive: true, message:"Socket Is UP!"})
  } catch (error) {
    rejects({error, status: 400, isActive: false, message: "FAIL to start socket!"});
  }

  

  
});

