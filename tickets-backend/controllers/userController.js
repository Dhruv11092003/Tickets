const bcrpyt=require("bcrypt")
const User=require("../models/usersModel")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")

dotenv.config()

exports.signUp=async (req,res)=>{
    const {name,email,password,mobile,org_name,role}=req.body
    const hashedPassword=await bcrpyt.hash(password,10)
    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        mobile,
        org_name,
        role
    })

    const response=await newUser.save()
    if (response){
        res.status(201).send({message:"User Registered Successfully! Wait for Admin's Approval"})
    }else{
        res.status(500).send({message:"Error creating User"})
    }

}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    const checkEmail=await User.findOne({email})
    if (checkEmail){
        const checkPassword=await bcrpyt.compare(password,checkEmail.password)
        if (checkPassword){
            if (checkEmail.status==="Disabled"){
                res.status(401).send({message:"Approval Pending! Contact Admin!"})
            }else{
                const payload={
                    name:checkEmail.name,
                    user_id:checkEmail.user_id,
                    mobile:checkEmail.mobile,
                    role:checkEmail.role,
                    email:checkEmail.email
                }
                const jwtToken=await jwt.sign(payload,process.env.SECRET_KEY)
                res.send({jwtToken})

            }
        }
    }
}