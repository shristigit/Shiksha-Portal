const mongoose =require('mongoose');
//const DB = process.env.DB;
const DB='mongodb+srv://Shristi:Singh%40123@cluster0.klbv3.mongodb.net/mern';

 mongoose.connect(DB , 
     { useNewUrlParser: true, useUnifiedTopology: true }   //, useCreateIndex: true , 
 ).then( () => {
     console.log('successful');
 }).catch( (err) => {
     console.log(err);
     console.log(' not successful db');
 }) ;


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://Shristi:Singh@123@cluster0.klbv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// if (client ){
//     console.log('connected');} 
// else{
//     console.log(' not connected');
// }
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(err);
//   // perform actions on the collection object
//   client.close();
// });

