const mongoose=require("mongoose");

const OrderSchema= new mongoose.Schema(

    {
        userId:{type:String, required:true},
        products:[
            {
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
            },
        ] ,       
        amount:{type: Number, required:true},
        address: {type: Object, required: true },
        status:{type:String, default: "pending"},
        status2:{type:String, default: "processing"},

    },{timestamps:true}
);

module.exports =mongoose.model("Order",OrderSchema);