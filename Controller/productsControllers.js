import User from "../Model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Products from "../Model/products.js";


async function addproduct(req,res){
try {
    const {id} = req.headers;

    const user = await User.findById(id);
    const {title,description,price, imageSrc} = req.body; 
    const existingproduct = await Products.findOne({title});

    if(user.role !== "admin"){
       return   res.status(400).json({message:"you do not have access to admin panel"})
    }


    if(existingproduct){
      return  res.status(400).json({message:"this product allready exist with the same title"});
    }
    
    const product = await Products.create({title,description,price, imageSrc})
    await product.save();
    return res.status(200).json({message:"product created successfully"})

} catch (error) {
    return res.status(500).json({message:"internal server  error"});
}}

 async function updateproduct(req,res){
    try {
        const {id,proid} = req.headers;
    
    
        const user = await User.findById(id);
        const {title,description,price, imageSrc} = req.body; 
        const existingproduct = await Products.findOne({title:title});;
        
        


        if(user.role !== "admin"){
           return   res.status(400).json({message:"you do not have access to admin panel"})
        }
        if(existingproduct){
          return  res.status(400).json({message:"this product allready exist with the same title"});
        }

        const updatedproduct = await Products.findByIdAndUpdate(proid, {title,description,price, imageSrc});
         await updatedproduct.save();
         return   res.status(200).json({message:"product updated"})

    
}catch(err){
    return   res.status(500).json({message:"internal server error"})
}}

 async function deleteproduct(req,res){
    try {
        const {id,proid} = req.headers;
    
        const user = await User.findById(id);

        if(user.role !== "admin"){
           return   res.status(400).json({message:"you do not have access to admin panel"})
        }
       
        await Products.findByIdAndDelete(proid);
         return   res.status(200).json({message:"product deleted"})

}catch(err){
    return   res.status(500).json({message:"internal server error"})
}}

async function getAllProducts(req,res){
    try {
        const allproducts = await Products.find().sort({createdAt: -1})
        return res.status(200).json(allproducts)
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }

};

async function getRecentllyAdded(req,res){
    try {
        const allproducts = await Products.find().sort({createdAt: -1}).limit(4)
        return res.status(200).json(allproducts)
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }

};

async function findByIdProducts(req,res){
    try {
        const {id} = req.params;
        const product = await Products.findOne({_id:id})
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }

};

export {addproduct, updateproduct,deleteproduct, getAllProducts, getRecentllyAdded, findByIdProducts}