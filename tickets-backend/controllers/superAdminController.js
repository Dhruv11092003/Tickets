const User = require("../models/usersModel");
const ticket = require("../models/ticketsModel");

exports.activateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const enableUser = await User.findOneAndUpdate(
      { user_id: userId },
      { status: "Active" }
    );
    if (enableUser) {
      res.status(200).send({ message: "User Activated Successfully" });
    }
  } catch (e) {
    res.status(500).send({ error: `Error:${e.message}` });
  }
};

exports.disableUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const enableUser = await User.findOneAndUpdate(
      { user_id: userId },
      { status: "Disabled" }
    );
    if (enableUser) {
      res.status(200).send({ message: "User Disabled" });
    }
  } catch (e) {
    res.status(500).send({ error: `Error:${e.message}` });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const getAllAdmins = await User.find({ role: "Admin" });
    if (getAllAdmins) {
      res.status(200).send({ admins: getAllAdmins });
    }
  } catch (e) {
    res.status(500).send({ error: `Error:${e.message}` });
  }
};

exports.getAllUsers = async (req, res) => {
  const { search } = req.query;
  try {
    let filter = {};

    if (search) {
      filter = { name: { $regex: search, $options: "i" } }; // Case-insensitive search
    }

    const getAllUsers = await User.find(filter);

    return res.status(200).send({ users: getAllUsers });
  } catch (e) {
    return res.status(500).send({ error: `Error: ${e.message}` });
  }
};

exports.assignTicketToAdmin = async (req, res) => {
  try {
    const { ticketId, adminId } = req.body;
    const getUser = await User.findOne({ user_id: adminId });
    const getTicket = await ticket.findOne({ ticketId: ticketId });
    const currentDate = Date.now();
    if (getUser) {
      if (getUser.assignedTickets.length < 10) {
        const assignTicket = await User.findOneAndUpdate(
          { user_id: userId },
          {
            $push: {
              assignedTickets: { ticketId: ticketId, assignedby: userId },
            },
          }
        );
        if (assignTicket) {
          const addMessageToAdmin = await User.findOneAndUpdate(
            { user_id: userId },
            {
              $push: {
                messages: {
                  title: "Ticket Assigned",
                  description: `TicketId:${ticketId} ,
                        Raised by:${getTicket.raisedBy}`,
                  Date: currentDate,
                },
              },
            }
          );
          const addMessageToUser = await User.findOneAndUpdate(
            { user_id: getTicket.raisedBy.userId },
            {
              $push: {
                messages: {
                  title: "Admin Assigned For the Raised Ticket",
                  description: `Ticket assigned to Admin with:
                        userId:${getUser.user_id}
                        name:${getUser.name}`,
                  Date: currentDate,
                },
              },
            }
          );
          const updateTicket = await ticket.findOneAndUpdate(
            { ticketId: ticketId },
            {
              status: "In Progress",
              assignedTo: {
                userId: userId,
                name: getUser.name,
                assignedOn: currentDate,
              },
            }
          );
          res
            .status(200)
            .send({
              message: `Ticket assigned to Admin with:{userId:${getUser.user_id},Admin-Name:${getUser.name}}`,
            });
        }
      } else {
        res
          .status(202)
          .send({
            message:
              "Admin already have Maximum quota of tickets assigned to them.Please Select Someone Else",
          });
      }
    }
  } catch (e) {
    res.status(500).send({ error: `Error: ${e.message}` });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticket.find();
    res.status(200).send({ tickets: tickets });
  } catch (e) {
    res.status(500).send({ error: `Error Fetching Tickets ${e.message}` });
  }
};
