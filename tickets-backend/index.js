const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const cors=require('cors')
const userRoutes=require("./routes/userRoutes")
const adminRoutes=require("./routes/adminRoutes")
const superAdminRoutes=require("./routes/superAdminRoutes")
const app=express()
app.use(express.json())
dotenv.config()
app.use(cors());

mongoose.connect(`${process.env.MONGODB_URI}`)
.then(()=>(
    console.log("Connected to DB")
)
    
).catch((err)=>(
    console.log(err,"Error Connecting to DB")
))

// route prefixes
// for normal user(client)
app.use('/user',userRoutes)
//for admins(resolvers)
app.use("/admin",adminRoutes)
//for superAdmin
app.use("/s-admin",superAdminRoutes)

PORT=process.env.PORT ||5000
app.listen(PORT,()=>(
    console.log(`Server Listening on Port ${PORT}`)
))
