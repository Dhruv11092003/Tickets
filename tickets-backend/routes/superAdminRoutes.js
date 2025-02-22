const express=require('express')
const auth=require("../auth")
const {activateUser,disableUser,assignTicketToAdmin,getAllAdmins,getAllUsers,getAllTickets}=require("../controllers/superAdminController")

const router=express.Router()

router.get("/activateUser/:userId",auth("Super-Admin"),activateUser)
router.get("/disableUser/:userId",auth("Super-Admin"),disableUser)
router.get("/getAllTickets",auth("Super-Admin"),getAllTickets)
router.post("/assignTicketToAdmin",auth("Super-Admin"),assignTicketToAdmin)
router.get("/getAllAdmins",auth("Super-Admin"),getAllAdmins)
router.get("/getAllUsers",auth("Super-Admin"),getAllUsers)
module.exports=router