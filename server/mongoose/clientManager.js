import models from './models'

const Client = models.Client;

const newClient = (name, email)=>{
  return Client.create({name, email}, (error, createdObj)=>{
    if(error){
      console.log(error);
    } else {
      console.log('Created', createdObj);
    }
  });
}

const getClientByEmail = (email)=>{
  return Client.find({email}, (error, res)=>{
    if(error){
      console.log(error);
    }
    console.log(res);
  }).exec();
}

const updateClient = ({name, email}) =>{
  return Client.findOneAndUpdate({email}, {name, email}).exec();
}

const deleteClient = (email)=>{
  return Client.deleteOne({email}).exec();
}

export default {newClient, getClientByEmail, updateClient, deleteClient};