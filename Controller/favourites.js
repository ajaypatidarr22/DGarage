import User from "../Model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Products from "../Model/products.js";


async function addtoFavourite(req,res){
    try {
        const {id,proid} = req.headers
        const user = await User.findById(id);
        
        const isaddedToFavourites = await user.favourites.includes(proid)

        if(isaddedToFavourites){
            return res.status(200).json({message:"book allready added to favourites"})
        }
        
        await User.findByIdAndUpdate(id,{$push:{favourites:proid}})
        return res.status(200).json({message:"product added to favourites"})
    
    } catch (error) {
        return res.status(500).json({messge:"internal server error"})
    }
}

async function removeFromFavourite(req,res){ 
    try {
        const {id,proid} = req.headers
        const user = await User.findById(id);
        const isaddedToFavourites = await user.favourites.includes(proid)

        if(isaddedToFavourites){
            await User.findByIdAndUpdate(id,{$pull:{favourites:proid}})
            return res.status(200).json({message:"product removed From favourites"})
        }
    } catch (error) {
        return res.status(500).json({messge:"internal server error"})
    }
} 

async function getfavourites(req,res){
    try {
        const {id} = req.headers
        const user = await User.findById(id).populate("favourites");

        
         if(!user){
            return res.status(400).json({message:"no items added to favourites"});
         }
         
        const favouriteProducts = await user.favourites;
        if(favouriteProducts.length < 1){
            return res.status(200).json({message:"not added"})
        }
        return res.status(200).json({status:"success", data:favouriteProducts})

    } catch (error) {
        return res.status(500).json({messge:"internal server error"})
    }
}


export {addtoFavourite, removeFromFavourite, getfavourites}