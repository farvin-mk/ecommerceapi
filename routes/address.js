const router =require("express").Router();
const DeliveryAddress = require("../models/Address");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


//create
router.post("/",verifyToken,async (req,res)=>{
const newAddress =new DeliveryAddress(req.body);

try {
    const savedAddress =await newAddress.save();
    res.status(200).json(savedAddress);
} catch (error) {
    res.status(500).json(error);
}
});

//update
router.put("/:id",verifyToken,async (req,res)=>{
   
    try {
        const updatedAddress =await DeliveryAddress.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedAddress);
    } catch (error) {
        res.status(500).json(error);
    }
});
//update2
router.put("/:userId/:houseNo",verifyToken,async (req,res)=>{
   
    try {
        const updatedAddress =await DeliveryAddress.findOneAndUpdate({userId:req.params.userId,houseNo:req.params.houseNo},{
            $set: req.body,
        },{new:true});
        res.status(200).json(updatedAddress);
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

router.delete("/:userId/:houseNo", async (req,res)=>{
    try {
       await DeliveryAddress.deleteOne({userId:req.params.userId,houseNo:req.params.houseNo});
        res.status(200).json("Cart has been deleted!");
    } catch (error) {
        res.status(500).json(error)
    }
});

// // //get user cart

router.get("/find/:userId",verifyToken, async (req,res) => {
    try {
       const address= await DeliveryAddress.find({userId: req.params.userId});  
        res.status(200).json(address);

    } catch (error) {
        res.status(500).json(error)
    }
}); 
// // //get user cart2

router.get("/find/:userId/:houseNo",verifyToken, async (req,res) => {
    try {
       const address= await DeliveryAddress.findOne({userId: req.params.userId,houseNo:req.params.houseNo});  
        res.status(200).json(address);

    } catch (error) {
        res.status(500).json(error)
    }
}); 


// //get all products
router.get("/",verifyToken,async (req,res)=>{
    try {
        const adresses=await DeliveryAddress.find();
        res.status(200).json(adresses);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports=router;