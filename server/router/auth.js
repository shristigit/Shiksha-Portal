const express= require('express');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const authenticate =require("../middleware/authenticate");

const router =express.Router();
require('../db/conn');
const User =require("../model/userSchema");

router.get('/', (req,res) => {
    res.send('Hello world from router');
});

router.post('/register', async  (req,res) => {
   // res.send('Hello world from router,you are registered!');
    console.log('register inside');
    const { name,email, phone ,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Pls filled the field properly"});
    }

    try{
        const userExist= await User.findOne({email :email}  );

        if(userExist) {
            console.log('1');
            return res.status(422).json({error : "Email already exist"})
        }
        
        if(password != cpassword){
            console.log('2');
            return res.status(422).json({error : "password and cpassowrd not same"})
        }

        const user =new User({name,email,phone,work,password,cpassword });
        
        //before saving here hash password and cpassword,so db has hashed paswords 
        // gp on userschema.




        const userRegister = await user.save();
        console.log('userreg');
        console.log(userRegister);

        if(userRegister){

            res.status(201).json({message : "user registered successfully" });
        }
        
        else {
            res.status(500).json({error: "Failed to registered" }); //db error
        } 
    }  

    catch(err){
        console.log(err);   //my error 
    }

    
}); 


 //using promises
  
 /*router.post('/register', (req,res) => {
    res.send('Hello world from router,you are registered!');
    const { name,email,phone,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Pls filled the field properly"});
    }

    User.findOne({email :email}  ).then((userExist) => {
        if (userExist) {
            return res.status(422).json({error: "Email already Exist" });
        }

        const user =new User({name,email,phone,work,password,cpassword });

        user.save().then(() => {
            res.status(201).json({message : "user registered successfully" });
        }).catch((err) => res.status(500).json({error: "Failed to registered" })); //db error
    }).catch(err => {console.log(err); });   //my error 
 //   console.log(name);
   // console.log(email);
    //console.log(req.body);
   // console.log(req.body.name);
    // console.log(req.body.email);
   // res.json({message : req.body });
});  */


//login routes
router.post('/login' , async (req,res) => {
    console.log(req.body);
   // res.json({message : "awesome"});
   try{
       let token;
    const {email , password} =req.body;

    if(!email ||  !password){

        return res.status(400).json({error: "pls fill the credentials"});
    }

    const userlogin= await User.findOne({email:email});
    
    

    const isMatch =await bcrypt.compare(password          ,   userlogin.password)
                                   //   entered password       pasword in db
    if(userlogin  && isMatch){
        console.log('user signin');
       // console.log(userlogin);
       res.json({message: "successful signin"});

       token = await userlogin.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken", token , {  ///token name ans=d value
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
    }); 
   
    }
    else{
       res.status(400).json({error: "invalid credentials"});
    }
    
}
catch(err) {
    console.log(err);
}
   
});


router.get('/about', authenticate , (req,res) => {
    res.send('Hello world about');
    res.send(req.rootUser);
});

router.get('/logout', authenticate , (req,res) => {
    res.send('Hello world logout');
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User logout');
});

router.get('/contact' , (req,res) => {
    console.log()
    res.send('Hello world contact');
    res.send(req.rootUser);
});
module.exports =router;