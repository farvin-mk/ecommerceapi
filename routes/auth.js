const User = require("../models/User");

const router =require("express").Router();
const CryptoJS =require("crypto-js");
const jwt =require("jsonwebtoken");

//register
router.post("/register",async (req,res)=>{
    const newUser= new User({
        username:req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
        name: req.body.name+" "+ req.body.lastName
    });
try{
   const savedUser= await newUser.save();
   res.status(201).json(savedUser);
}catch(err){
   res.status(500).json(err);
}
});

//login

router.post("/login", async (req,res)=>{
   try {
    const user =await User.findOne({username:req.body.username});
    !user && res.status(401).json("Wrong Credential!");


    const hashPassword= CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword =hashPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !==req.body.password && res.status(401).json("Wrong Credential!");
    
    const accessToken= jwt.sign(
        {
        id: user._id,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    {expiresIn: "3d"}
    );

    const {password, ...others} =user._doc;

    res.status(200).json({...others,accessToken});

} catch (error) {
       res.status(500).json(error);
   }
    
});


module.exports=router;