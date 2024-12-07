const express= require("express");
const app =express();
const mongoose= require("mongoose");
const dotenv =require("dotenv");
const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")
const productRoute=require("./routes/product")
const cartRoute=require("./routes/cart")
const wishlistRoute =require("./routes/wishList")
const orderRoute=require("./routes/order")
const stripeRoute=require("./routes/stripe")
const addressRoute=require("./routes/address")
const cors=require("cors")

dotenv.config();

mongoose.connect(process.env.MONGO_URL
).then(()=>console.log("DB Connection Successfully!"))
.catch((err)=>{
    console.log(err);
})
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/wishlist",wishlistRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);
app.use("/api/address",addressRoute);




app.listen(process.env.PORT || 5000, ()=>{
console.log("backend server is running!");
});