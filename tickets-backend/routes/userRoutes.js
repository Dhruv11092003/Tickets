const express=require('express')
const path = require("path");
const router=express.Router()
const auth=require('../auth')
const Ticket = require("../models/ticketsModel");
const {signUp,login,raiseTicket,getAllTicketsOfUser,disableTicket,invokeTicket}=require("../controllers/userController")

router.post("/register",signUp)
router.post('/login',login)
router.post("/raiseTicket", auth("User"), raiseTicket);
router.get("/getAllTicketsOfUser", auth("User"),getAllTicketsOfUser );
router.get("/revokeTicket/:ticketId",auth("User"),disableTicket)
router.get("/invokeTicket/:ticketId",auth("User"),invokeTicket)
module.exports=router