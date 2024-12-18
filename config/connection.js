const mongoose = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB Atlas successfully connected with Cookpedia Server");
}).catch(err=>{
    console.log("MongoDB Atlas connection failed!!!");
    console.log(err);
})