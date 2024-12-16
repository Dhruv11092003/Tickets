const express=require('express')
const router=express.Router()
const auth=require("../auth")
const {getAllTicketsAssigned}=require("../controllers/adminController")

router.get("/getAssignedTickets",auth("Admin"),getAllTicketsAssigned)


module.exports=router