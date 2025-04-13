import User from "../Model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


async function register(req,res){
   
    try {
        const {name, email, phone,role, password,address}  = req.body
        if (!name || !email || !password) {
          return res.json({message:"fill all the fields"})
        }
        const user = await User.findOne({email})
        if(user){
           return  res.json({message:"mail allrady exists"})
        }
    
        const existingUser = await User.findOne({name})
        if (existingUser) {
           return  res.status(400).json({message:"Username allready exist"})
        }
    
        const existingUserphones = await User.findOne({phone})
        if (existingUserphones) {
          return  res.status(400).json({message:"phone allready registered"})
        }

        else{ 
             const hashpass = await bcrypt.hash(password,10)
            const user = await User.create({name,email,phone,role:"user",password:hashpass, address}) 
            await user.save()
            return res.json({message:"registered successfully"})
        }
    } catch (error) {
        return res.send(error)
    }
}

async function login(req,res){
try {
    const {email,password} = req.body;
    const existingUser = await User.findOne({email})
     if(!existingUser){
        return res.status(400).json({message:"Invalid credentials"})
     }

      const data =  await bcrypt.compare(password,existingUser.password,)
        if (data) {

            const authclaims = [
                {name:existingUser.name},
                {role:existingUser.role}]

            const token = jwt.sign({authclaims},"garage", {expiresIn: "30d"})
           return   res.status(200).json({
                id:existingUser._id,
                role: existingUser.role,
                token,
                message:"Logged in Success"
            })

        }else{
          return  res.status(400).json({message:"Invalid credentials hai"})
        }


} catch (error) {
   return  res.status(500).json({message: "internal server error"})
}

}

async function UserDetails(req,res){

try{
    const {id} = req.headers
    const user = await User.findById(id).select("-password");
    if (!user) {
        return  res.status(400).json({message:"user not found"})
    } 
     return res.status(200).json(user)
    }catch(err){
       return res.status(400).send({message:"server issue"})
    }
}

async function UsersD(req,res){

  try{
      const {id} = req.params
      const user = await User.findById(id).select("-password");
      if (!user) {
          return  res.status(400).json({message:"user not found"})
      } 
       return res.status(200).json(user)
      }catch(err){
         return res.status(400).send({message:"server issue"})
      }
  }

async  function UpdateAddress(req,res){
   
    try { 
        const {id} = req.headers;
        const {address} = req.headers;
        await User.findByIdAndUpdate(id,{address})
      return  res.status(200).json({message:"address updated"});

    } catch (error) {
      return  res.status(400).json({message:"Internal serever error"});
    }

}


export { register, login, UserDetails, UpdateAddress,UsersD}