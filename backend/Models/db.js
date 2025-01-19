const mongoose = require('mongoose');

const mongo_url = process.env.MONGOS_CONN;

mongoose.connect(mongo_url)
.then(() =>{
    console.log("MongosDB connection successfully established")
})
.catch((err) =>{
    console.log("MongosDB connection error:- " + err);
}); 