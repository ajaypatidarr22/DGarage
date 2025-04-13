import mongoose from "mongoose";
import validator from "validator"


const UserSchema = mongoose.Schema({

    name :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required: true,
        unique: true,
        validate :[validator.isEmail,"please enter a correct  email"]
    },
    phone:{
        type: Number,
        required : true,
        unique: true
    },
    role:{
        type: String,
        required : true,
        enum: ["user","admin"]
    },

    password:{
        type: String,
        required: true,
        minlength:8
    },
    
    avatar:{
        type: String
    },
    
    address:{
        type: String,
        required: true
    },

    favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],

    slot:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Slot"
    }],

    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],

    order: [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]


},{timestamps:true})

const User = mongoose.model("User", UserSchema);
export default User 