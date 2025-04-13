import jwt from  "jsonwebtoken"

function userAuth(req,res,next){

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(token == null){
        return  res.status(401).json({message:"Authentication token required"})
    }

    jwt.verify(token,"garage",(err,user)=>{
       
        if (err) {
        res.status(403).json({message:"tooken expired please sign in again"})
        }
        req.user = user
        next();
    })
}



export default userAuth