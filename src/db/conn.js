const mongoose = require('mongoose');

// creating a database
mongoose.connect("mongodb://127.0.0.1:27017/technicalweb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log(err);
})