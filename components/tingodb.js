var Engine = require('tingodb')()
var db = new Engine.Db('./database/', {});
var _ = require('lodash');
 


  //console.log(_.random(1, 999999, 0)
/*  insertNewChat(_.random(1, 999999, 0),2,3)
  .then(data => console.log('then::',data))
  .catch(data =>console.log('catch::',data))
    */


//findChatList( ).then(data => console.log(data))
var firstUser = 2
var secondUser = 3


 findChatList( 
   {$and: [
          {"firstUser" : { $in: [firstUser, secondUser] } },
          {'secondUser': { $in: [firstUser, secondUser] }}
        ]
  }).then(data => console.log(data))  

//CreateUser('current-user','gogo2')
//findUsers().then(data => console.log(data))
//CreateUser('admin','raul')
//CreateUser('admin','pepe')
//insertNewChatInUsers()

// su roll es admin
// findUsers({roll:'admin'}).then(data => console.log(data))

// sun nombre es raul o pepe
// findUsers({ "name" : { $in: ["raul", "pepe"] } } )
/*    
#su nombre es raul o pepe,
#o tiene de roll admin
findUsers(
  {$or: [
          { "name" : { $in: ["raul", "pepe"] } },
          {'roll': 'admin'}
        ]
  }
)
 */

/**
 * 
 * @param {json Objet} query  
 */
function findUsers(query){

  return new Promise((resolve, reject) => {
     users = db.collection("users");
    
    users.find(query).toArray(function(err, results) {
      if (err) reject(err)  
      resolve(results)
    });

  })
}


/**
 * 
 * @param {json objet} query 
 */
function findChatList(query){
  console.log(query)
  return new Promise((resolve,reject) => {
    var ChatList = db.collection("ChatList");
    ChatList.find(query).toArray(function(err, results) {
      if (err) reject(err) 
      resolve(results)
    });

  })

}


/**
 * 
 * @param {string} roll 
 * @param {string} name 
 */
function CreateUser(roll,name){
  return new Promise((resolve,reject) => {
    findUsers({name : name}).then((data)=>{
      console.log('data::',name)
      if(data.length === 0){
        var users = db.collection("users");
        var insert = {name:name,roll:roll,'chats':[]}
        users.insert(insert,(err,results) =>{
          if(err) reject(err)
            resolve(results)
        })
      }
      else{
        reject('ya existe')
      }
    })

  })
}


/**
 * 
 * @param {string} user 
 * @param {number} numberChat 
 */
function insertNewChatInUsers(user,numberChat){
   return new Promise((resolve,reject) => {
      var users = db.collection("users");
      users.update(
        { _id: user },
        { $push: { chats: numberChat } },
        (err,results)=>{
          if(err) reject(err)
            resolve(results)
        }
      )
   })
}
  


/**
 * 
 * @param {int} idChat 
 * @param {string} firstUser 
 * @param {string} secondUser 
 */
function insertNewChat(idChat,firstUser,secondUser){

  return new Promise((resolve,reject) => {
    var ChatList = db.collection("ChatList");
    var users = db.collection("users");
    ChatList.find({'idChat':idChat}).toArray(function(err, results) {
      findChatList( 
        {$and: [
                {"firstUser" : { $in: [firstUser, secondUser] } },
                {"secondUser": { $in: [firstUser, secondUser] }}
              ]
        }).then(data => {

          
          if(results.length === 0 && (firstUser != secondUser ) && data.length === 0){

                var insert = {idChat:idChat,firstUser:firstUser,secondUser:secondUser}
                ChatList.insert(insert);
                insertNewChatInUsers(firstUser,idChat).then(
                  insertNewChatInUsers(secondUser,idChat).then(
                    resolve('insertado')

                  ).catch(
                    reject('error al insertar in user')
                  )

                ).catch(
                    reject('error al insertar in user')
                  )
            }else{
              reject('No Se Puede Insertar')
            }

        }) 
      
    });


  })

}


function createChat(firstUser,secondUser){
}
function insertInChat(firstUser,secondUser){

}
function readMessengers(firstUser,secondUser){

}

