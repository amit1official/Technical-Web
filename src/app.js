const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const User = require('./models/user');


// setting the path
const staticpath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");


console.log(path.join(__dirname,"../node_modules/bootstrap/dist/css"));
// middleware
app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);


// routing
app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/contact',async (req,res)=>{
  try {
    // res.send(req.body)
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
})


// server create
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`);
})