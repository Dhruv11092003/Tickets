const express=require('express')
const path = require("path");
const router=express.Router()
const auth=require('../auth')
const Ticket = require("../models/ticketsModel");
const {signUp,login,raiseTicket}=require("../controllers/userController")

router.post("/register",signUp)
router.post('/login',login)
router.post("/raiseTicket", auth("User"), raiseTicket);

module.exports=router