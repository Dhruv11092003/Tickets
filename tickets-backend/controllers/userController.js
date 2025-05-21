const bcrpyt=require("bcrypt")
const User=require("../models/usersModel")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
const ticket = require("../models/ticketsModel")

dotenv.config()

exports.signUp=async (req,res)=>{
    try{
    const {name,email,password,mobile,org_name,role}=req.body
    const hashedPassword=await bcrpyt.hash(password,10)
    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        mobile,
        org_name,
        role
    })

    const response=await newUser.save()
    if (response){
        res.status(201).send({message:"User Registered Successfully! Wait for Admin's Approval"})
    }else{
        res.status(500).send({message:"Error creating User"})
    }
}catch(e){
    res.status(500).send({message:`Error creating User:${e.message}`})
}

}

exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body
    const checkEmail=await User.findOne({email})
    if (checkEmail){
        const checkPassword=await bcrpyt.compare(password,checkEmail.password)
        if (checkPassword){
            if (checkEmail.status==="Disabled"){
                res.status(401).send({message:"Approval Pending! Contact Admin!"})
            }else{
                const payload={
                    name:checkEmail.name,
                    user_id:checkEmail.user_id,
                    mobile:checkEmail.mobile,
                    role:checkEmail.role,
                    org_name:checkEmail.org_name,
                    email:checkEmail.email
                }
                const jwtToken=await jwt.sign(payload,process.env.SECRET_KEY)
                res.send({jwtToken})

            }
        }
    }
    console.log("check")
}catch(e){
    res.send({error:e.message})
}
}

exports.raiseTicket=async(req,res)=>{
    try{
    const {user}=req
    const {title,description,attachments}=req.body


    const newTicket=new ticket({
        title,
        description,
        attachments,
        org_name:user.org_name,
        raisedBy:{
            userId:user.user_id,
            userType:user.role
        }
    })

    const saveTicket=await newTicket.save()
    if (saveTicket){
        const updateUser=await User.findOneAndUpdate({user_id:user.user_id},{$push:{tickets_raised:{ticketId:saveTicket.ticketId}}})
        if (updateUser){
        res.status(201).send({message:"Ticket Raised Successfully",ticket:saveTicket})
        }
    }}catch(e){
        res.status(500).send({message:"Error Raising Ticket",error:e.message})
    }
}
exports.getSingleUserDetails = async (req, res) => {
    try {
      const { userId } = req.body; // Fix: Extract from req.body
      const getUser = await User.findOne({ user_id: userId });
  
      if (getUser) {
        res.send({ user: getUser, messages: getUser.messages });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message }); // Fix: Correct error handling
    }
  };
  
exports.getAllTicketsOfUser=async(req,res)=>{
    try{
        const {user}=req
        const {user_id}=user
        
        const getTickets = await ticket.find({ "raisedBy.userId":user_id});
        if (getTickets){
            res.status(200).send({tickets:getTickets})
        }
    }catch(e){
        res.status(500).send({error:e.message})
    }
}

exports.resolveTicket=async(req,res)=>{
    try{
    const {ticketId}=req.params
    const disableTicket=await ticket.findOneAndUpdate({ticketId:ticketId},{status:"Resolved"})
    if (disableTicket){
        res.status(200).send({message:"Ticket Revoked Successfully"})
    }}catch(e){
        res.status(500).send({error:e.message})
    }
}

exports.invokeTicket=async(req,res)=>{
    try{
    const {ticketId}=req.params
    const EnableTicket=await ticket.findOneAndUpdate({ticketId:ticketId},{status:"Created"})
    if (EnableTicket){
        res.status(200).send({message:"Ticket Invoked Successfully"})
    }}catch(e){
        res.status(500).send({error:e.message})
    }
}