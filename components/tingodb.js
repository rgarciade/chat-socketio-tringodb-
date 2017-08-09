var Engine = require('tingodb')()
//var fs = require('fs') 



 
/*
 var insert = {id:'3',name:'jose',roll:'admin'}
 var insertt = {id:'4',name:'pepo',roll:'current-user'}
     collection.insert([insert,insertt]);
*/
/* var aa = collection.find()
console.log(aa)
  function initDatabaseAdmin(id){
    
  } */
/* collection.find({roll:'admin'},function(err,result){
  console.log('result::',result)
  console.log('err::',err)
  }
) */

//findUsers()
// su roll es admin
//findUser({roll:'admin'})

// sun nombre es raul o pepe
//findUsers({ "name" : { $in: ["raul", "pepe"] } } )
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
function findUsers(query){
   var db = new Engine.Db('./database/users/', {});
   var collection = db.collection("users");
  
   collection.find(query).toArray(function(err, results) {
      console.log(results);
  });
}
