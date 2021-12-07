const jwt = require("jsonwebtoken");
const User = require ("../model/userSchema");

const Authenticate = async  (req,res,next) => {
    try{
        const token =req.cookies.jwtoken;
        const verifyToken =jwt.verify(token,"nosfirhfuerhgjsdnuwdhfjwbfjewnfjwrjbjndsfegegerg");
        const rootUser =await User.findOne({ _id :verifyToken._id,"tokens.token" :token });

        if(!rootUser){
            res.send('user not found');
        }

        req.token=token;
        req.rootUser =rootUser;
        req.userID=rootUser._id;

    }
    catch(err){
        res.status(401).send('Unauthorized :No token provided');
        console.log(err);

        next();

    }
}

module.exports =Authenticate;