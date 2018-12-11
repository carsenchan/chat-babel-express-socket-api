import models from './models';

const MbRight = models.MemberRight;

export const newMbRight = (right)=>{

  console.log(right);
  const newRight = new MbRight({right});

  return new Promise((resolve, reject)=>{
    newRight.save()
    .then(savedResult=>{
      resolve(savedResult);
    })
    .catch(error=>{
      reject(error);
    });
  })

  // return newRight.save()
  // .then(item=>{
  //   console.log('Item Saved', item)
  //   return item
  // })
  // .catch(error=>console.log(error))
  //return newRight.save();
  // return MbRight.create({right}, (err, createdObj)=>{
  //   if(err) console.log(err)
  //   console.log(createdObj);
  // });
};

