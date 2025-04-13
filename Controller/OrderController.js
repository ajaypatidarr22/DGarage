import User from "../Model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Products from "../Model/products.js";
import Order from "../Model/Order.js";

async function PlaceOrder(req,res){
    try {
        const {id} = req.headers;
        const {order} = req.body;
        if (!id || !Array.isArray(order)) {
            return res.status(400).json({ message: "Invalid request data." });
          }
        for (const orderData of order) {
            if (!orderData._id) {
                return res.status(400).json({ message: "Invalid order data." });
              }
            const newOrder = await Order.create({user : id, product: orderData._id});
            const orderDataDB = await newOrder.save();

            await User.findByIdAndUpdate(id,{
                $push:{order:orderDataDB._id}
            })       
            await User.findByIdAndUpdate(id,{
                $pull:{cart : orderData._id}
            })
        }

        return res.status(200).json({ status:"success", message:"Order placed successfully"})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

async function getOrderHistory(req,res){
try {
    const {id} = req.headers;

    const userOrderHistory = await User.findById(id).populate({
        path: "order",
        populate : {path :"product"}
    })

    const Orderhistory = userOrderHistory.order.reverse();
    return res.status(200).json({status:"success",data: Orderhistory})

} catch (error) {
    return res.status(400).json({message:"internal server error"})
}

}

async function getAllOrders(req,res){
    try {
        const userData = await Order.find({})
        .populate({
            path:"product"
        }).populate({ 
            path:"user"
        }).sort({createdAt:-1})

     if(!userData){
         return res.status(200).json("no data found");
     }
        return res.status(200).json({status:"success", data:userData})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

async function updateStatus(req,res){
 try {    
    const {id, status} = req.body;
    console.log(id,status); 

    if (!id || !status) {
         return res.status(200).json({message:"invalid"})
    }

    await Order.findByIdAndUpdate(id,{status})

    return  res.status(200).json({status:"success",message:"status updated successfully"})
 } catch (error) {
     return res.status(200).json({message:"internal server error"})
 }

}

async function DeleteAllOrder(req,res){
    try {
       const name = await Order.deleteMany({})
        console.log(name)
        return  res.status(200).json({status:"success",message:"Orders deleted successfully"})
     } catch (error) {
         return res.status(200).json({message:"internal server error"})
     }
};

async function DeleteAllUserOrder(req,res){
    const {id} = req.headers
    try {
         await User.findByIdAndUpdate(id,{order:[]});
        return  res.status(200).json({status:"success",message:"users Orders deleted successfully"})
     } catch (error) {
         return res.status(200).json({message:"internal server error"})
     }
};


export {PlaceOrder,getOrderHistory,getAllOrders,updateStatus,DeleteAllOrder,DeleteAllUserOrder}