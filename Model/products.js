import mongoose from "mongoose";


const ProductSchema = mongoose.Schema({

    title :{
        type : String,
        required : true
    },

    description:{
        type : String,
        required: true,
    },

    price:{
        type: Number,
        required : true,
    },
    imageSrc:{
        type: String,
        required : true,
    },


},{timestamps:true})


const Products = mongoose.model("Product", ProductSchema);
export default Products 