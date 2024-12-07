const mongoose=require("mongoose");

const AddressSchema= new mongoose.Schema(

    {
        userId:{type:String, required:true},
      
                customerName: {
                    type:String,required:true,
                },
                mobile:{
                    type: Number,
                    required:true,
                },
                houseNo:{
                    type: String,
                    unique:true,
                    required:true,
                },
                apartmentName:{
                    type: String,
                    default:" ",
                },
                streetName:{
                    type: String,
                    required:true,
                },
                landmark:{
                    type: String,
                    default:" ",
                },
                locality:{
                    type: String,
                    required:true,
                },
                city:{
                    type: String,
                    required:true,
                },
            
               

    },{timestamps:true}
);

module.exports =mongoose.model("Address",AddressSchema);