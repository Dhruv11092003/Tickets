const User = require("../models/usersModel");
const ticket = require("../models/ticketsModel");

// const requestTicketReAssign=async(req,res)=>{
//     const {ticketId}=req.params
//     const getTicket=await ticket.get
// }

exports.getAllTicketsAssigned = async (req, res) => {
  try {
    const { user } = req;
    const getTickets = await ticket.find({
      "assignedTo.userId": user.user_id,
    });
    if (getTickets) {
      res.status(200).send({ tickets: { getTickets } });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
