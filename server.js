const express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var session=require('express-session');
var bcrypt=require('bcrypt');
const path=require('path');
var app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/userdata',{useNewUrlParser:true},(err)=>{
if(!err){
    console.log("chill yaar");
}
else{
    console.log("mrr ja kutte");
}
});

var nameschema=new mongoose.Schema({
    name:String,
    fullname:String,
    email:String,
    password:String,
    city:String
});
var user=mongoose.model('user',nameschema);

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','form.html'));
});

app.post("/addname", (req, res) => {

    let {username, fullname, email, password ,city} = req.body; // this is called destructuring. We're extracting these variables and their values from 'req.body'
    
    let userData = {
    	username,
        password: bcrypt.hashSync(password, 10), // we are using bcrypt to hash our password before saving it to the database
        fullname,
        email,
        city
    };
  let newUser= new user(userData);
    newUser.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});



app.listen(3200,(req,res)=>{
    console.log("server connected");
});