const mongoose = require("mongoose");
const uuid = require("short-uuid");
const userSchema = mongoose.Schema({
  user_id: { type: String, default: uuid.generate() },
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  mobile:{type:String,required:true},
  org_name:{type:String,required:true},
  status: { type: String, enum: ["Active", "Disabled"], default: "Disabled" ,required:true},
  role: {
    type: String,
    enum: ["User", "Admin", "Super-Admin"],
    default: "User",
  },
  tickets_raised: { type: [{}],default:[]},
  assignedTickets:{ type: [{}],default:[]},
  createdOn: { type: Date, default: Date.now()},
  messages:{ type: [{}],default:[]}
});

const User = mongoose.model("Users",userSchema);

module.exports = User;
