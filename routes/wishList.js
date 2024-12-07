const router =require("express").Router();
const WishList = require("../models/WishList");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


//create
router.post("/",verifyToken,async (req,res)=>{
const newWishlist =new WishList(req.body);

try {
    const savedWishlist =await newWishlist.save();
    res.status(200).json(savedWishlist);
} catch (error) {
    res.status(500).json(error);
}
});

//update
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
   
    try {
        const updatedWishlist =await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedWishlist);
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
       await WishList.deleteOne({userId:req.params.userId,productId:req.params.productId,size:req.params.size,color:req.params.color});
        res.status(200).json("Cart has been deleted!");
    } catch (error) {
        res.status(500).json(error)
    }
});

// // //get user cart

router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res) => {
    try {
       const wishlist= await WishList.find({userId: req.params.userId});  
        res.status(200).json(wishlist);

    } catch (error) {
        res.status(500).json(error)
    }
}); 
// // //get user cart2

router.get("/find/:userId:productId:color:size",verifyTokenAndAuthorization, async (req,res) => {
    try {
       const wishlist= await WishList.findOne({userId: req.params.userId,productId:req.params.productId,size:req.params.size,color:req.params.color});  
       // res.status(200).json(cart.);

    } catch (error) {
        res.status(500).json(error)
    }
}); 


// //get all products
router.get("/",verifyToken,async (req,res)=>{
    try {
        const wishlist=await WishList.find();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports=router;