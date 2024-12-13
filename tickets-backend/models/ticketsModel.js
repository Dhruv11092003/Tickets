const mongoose = require("mongoose");
const uuid = require("short-uuid");

const ticketSchema = mongoose.Schema(
  {
    ticketId: { type: String, default: () => uuid.generate() },
    status: {
      type: String,
      enum: ["Created", "In Progress", "Resolved"],
      default: "Created",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    raisedBy: { type: { userId: String, userType: String } },
    assignedTo: {
      type: { userId: String, name: String, assignedOn: Date },default:{}
    },
    attachments: {
      type: [{ fileName: String, fileLink: String }],default:[]
    },
    org_name: { type: String },
  },
  { timestamps: true }
);

const ticket = mongoose.model("tickets", ticketSchema);

module.exports = ticket;
