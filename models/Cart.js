const mongoose=require("mongoose");

const CartSchema= new mongoose.Schema(

    {
        userId:{type:String, required:true},
      
                productId: {
                    type:String,
                },
                quantity:{
                    type: Number,
                    default:1,
                },
                color:{
                    type: String,
                    default:" ",
                },
                size:{
                    type: String,
                    default:" ",
                },
            
               

    },{timestamps:true}
);

module.exports =mongoose.model("Cart",CartSchema);