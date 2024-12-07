const router =require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


//create
router.post("/",verifyToken,async (req,res)=>{
const newCart =new Cart(req.body);

try {
    const savedCart =await newCart.save();
    res.status(200).json(savedCart);
} catch (error) {
    res.status(500).json(error);
}
});

//update
router.put("/:id",verifyToken,async (req,res)=>{
   
    try {
        const updatedCart =await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});
//update2
router.put("/:userId/:productId/:size/:color",verifyToken,async (req,res)=>{
   
    try {
        const updatedCart =await Cart.findOneAndUpdate({userId:req.params.userId,productId:req.params.productId,size:req.params.size,color:req.params.color},{
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// // //delete

// router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
//     try {
//         await Cart.findByIdAndDelete(req.params.id);
//         res.status(200).json("Cart has been deleted!");
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });
// // //delete2

router.delete("/:userId/:productId/:size/:color", async (req,res)=>{
    try {
       await Cart.deleteOne({userId:req.params.userId,productId:req.params.productId,size:req.params.size,color:req.params.color});
        res.status(200).json("Cart has been deleted!");
    } catch (error) {
        res.status(500).json(error)
    }
});
router.delete("/:productId", async (req,res)=>{
    try {
       await Cart.deleteOne({productId:req.params.productId});
        res.status(200).json("Cart has been deleted!");
    } catch (error) {
        res.status(500).json(error)
    }
});
// // //get user cart

router.get("/find/:userId",verifyToken, async (req,res) => {
    try {
       const cart= await Cart.find({userId: req.params.userId});  
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json(error)
    }
}); 
// // //get user cart2

router.get("/find/:userId/:productId/:color/:size",verifyToken, async (req,res) => {
    try {
       const cart= await Cart.findOne({userId: req.params.userId,productId:req.params.productId,size:req.params.size,color:req.params.color});  
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json(error)
    }
}); 


// //get all products
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try {
        const carts=await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports=router;