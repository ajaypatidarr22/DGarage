import mongoose from "mongoose";
import Slot from '../Model/Slot.js';
import User from "../Model/User.js";


async function CreateAllslots(req, res){
     const SlotData = req.body;
    try {
      if (!SlotData) {
        return res.status(400).json({ message: 'Invalid request data' });
    }
      const slot = await Slot.create(SlotData);
      await slot.save();
        return res.status(201).json({ message: 'Slot created successfully'});
    } catch (error) {
     return res.status(500).json({ message: 'Error creating slot', error });
    }
  }
  
   async function getAllslots(req, res){// admin
    try {
      const slots = await Slot.find({});
      res.json(slots);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching slots', error });
    }
  }

  async function getAllslotsUser(req, res){
    const userid = req.headers.userid
    try {
      const slots = await Slot.find({userId:userid})
       return res.status(200).json(slots);
    } catch (error) {
       return res.status(500).json({ message: 'Error fetching slots', error });
    }
  }

//   /api/slots/:id
async function DeleteSlot(req, res){
    const slotId = req.headers.slotid
    try {
      await Slot.findByIdAndDelete(slotId);
      return res.json({ message: 'Slot deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting slot', error });
    }
  }
  
//   /api/slots/:id/status
async function UpdateStatusSlot(req, res){// admin
    const {slotid,status} = req.headers;
;
    try {
      const slot = await Slot.findByIdAndUpdate(
        slotid,
        {status}
      );
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
      res.json({ message: 'Slot status updated', slot });
    } catch (error) {
      res.status(500).json({ message: 'Error updating slot status', error });
    }
  }


  export {getAllslots,getAllslotsUser,CreateAllslots,DeleteSlot, UpdateStatusSlot}