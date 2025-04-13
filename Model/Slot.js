import mongoose from "mongoose";


const SlotSchema = mongoose.Schema({

    email: String,
    service: String,
    time: String,
    status: { type: Boolean, default: false },
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
   },

},{timestamps:true})


const Slot = mongoose.model("Slot", SlotSchema);
export default Slot 