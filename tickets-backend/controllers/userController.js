const bcrpyt = require("bcrypt");
const User = require("../models/usersModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const ticket = require("../models/ticketsModel");

dotenv.config();

const normalizeEmail = (email = "") => email.trim().toLowerCase();
const normalizeText = (value = "") => value.trim();

const updateTicketStatus = async (ticketId, status) => {
  return ticket.findOneAndUpdate({ ticketId }, { status });
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, mobile, org_name, role } = req.body;
    const hashedPassword = await bcrpyt.hash(password, 10);
    const newUser = new User({
      name: normalizeText(name),
      email: normalizeEmail(email),
      password: hashedPassword,
      mobile: normalizeText(mobile),
      org_name: normalizeText(org_name),
      role,
    });

    const response = await newUser.save();
    if (response) {
      return res
        .status(201)
        .send({ message: "User Registered Successfully! Wait for Admin's Approval" });
    }

    return res.status(500).send({ message: "Error creating User" });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).send({ message: "Email already exists" });
    }
    return res.status(500).send({ message: `Error creating User:${e.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const checkEmail = await User.findOne({ email: normalizedEmail });

    if (!checkEmail) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const checkPassword = await bcrpyt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    if (checkEmail.status === "Disabled") {
      return res.status(401).send({ message: "Approval Pending! Contact Admin!" });
    }

    const payload = {
      name: checkEmail.name,
      user_id: checkEmail.user_id,
      mobile: checkEmail.mobile,
      role: checkEmail.role,
      org_name: checkEmail.org_name,
      email: checkEmail.email,
    };
    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.setHeader("Authorization", `Bearer ${jwtToken}`);
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

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

exports.resolveTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const disableTicket = await updateTicketStatus(ticketId, "Resolved");
    if (disableTicket) {
      return res.status(200).send({ message: "Ticket Revoked Successfully" });
    }
    return res.status(404).send({ message: "Ticket not found" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

exports.invokeTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const enableTicket = await updateTicketStatus(ticketId, "Created");
    if (enableTicket) {
      return res.status(200).send({ message: "Ticket Invoked Successfully" });
    }
    return res.status(404).send({ message: "Ticket not found" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};
