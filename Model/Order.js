import mongoose from "mongoose";


const OrderSchema = mongoose.Schema({

    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"User"
    },

    product:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product" 
    },

    status:{
        type: String,
        required : true,
        default: "Order Placed"   
    }
},{timestamps:true})


const Order = mongoose.model("Order",OrderSchema);
export default Order 