const express=require('express')
const router=express.Router()
const auth=require('../auth')
const {signUp,login,raiseTicket,getAllTicketsOfUser,resolveTicket,invokeTicket,getSingleUserDetails}=require("../controllers/userController")

router.post("/register",signUp)
router.post('/login',login)
router.post("/getSingleUserDetails",getSingleUserDetails);
router.post("/raiseTicket", auth("User"), raiseTicket);
router.get("/getAllTicketsOfUser", auth("User"),getAllTicketsOfUser );
router.get("/resolveTicket/:ticketId",auth("User"),resolveTicket)
router.get("/invokeTicket/:ticketId",auth("User"),invokeTicket)
module.exports=router