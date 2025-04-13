import User from "../Model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Products from "../Model/products.js";


 async function getcartitems(req,res){
    try {

        const {id, proid} = req.headers
        const user = await User.findById(id).populate("cart");
        
        if(!user) {
            return res.status(200).json({message:"internal sever error"})
        }

        const cartitems = user.cart;
        if(cartitems.length < 1){
            return res.status(200).json({message:"cart is empty"});

        }

        return res.status(200).json({status:"success",data:cartitems})

    } catch (error) {
        return res.status(200).json({message:"internal server error"});
    }
}

async function addToCart(req,res){
    try {
        const {id,proid} = req.headers
        const user = await User.findById(id);
        const isInCart = await user.cart.includes(proid)

        if(isInCart){
            return res.status(200).json({message:"product allready added to cart"})
        }
        
        await User.findByIdAndUpdate(id,{$push:{cart:proid}})
        return res.status(200).json({message:"product added to cart"})
    } catch (error) {
        return res.status(500).json({messge:"internal server error"})
    }
}
 
async function removeItemFromCart(req,res){ 
    try {
        const {id,proid} = req.headers
        const user = await User.findById(id);
        const isaddedToCart = await user.cart.includes(proid)
        if(isaddedToCart){
            await User.findByIdAndUpdate(id,{$pull:{cart:proid}})
            return res.status(200).json({message:"product removed From cart"})
        }
    } catch (error) {
        return res.status(500).json({messge:"internal server error"})
    }
} 

export {getcartitems, addToCart, removeItemFromCart};     