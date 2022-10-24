import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {generateToken} from "../utilities/generate_token.js";
import Admin from "../models/admin.js";

export const admin_signup = asyncHandler(async(req, res) => {
    const {firstName, middleName, lastName, phoneNumber, email, password} = req.body
    const adminExists = await Admin.find({$or: [{email: email}, {phoneNumber: phoneNumber}]})
    if(adminExists.length > 0){
        res.json({message: "Admin already exists"})
    }else{
        const hashedPass = await bcrypt.hash(password, 10)
        const admin = await Admin.create({
            firstName, lastName, phoneNumber,
            password: hashedPass, email,

        })
        if(admin){
            res.status(201).json({
                status: "ok",
                message: "Admin created successfully",
                data:{
                    _id: admin.id,
                    firstName: admin.firstName,
                    middleName: admin.middleName,
                    lastName: admin.lastName,
                    phoneNumber: admin.phoneNumber,
                    email: admin.email,
                    password: admin.password,
                    token: generateToken(admin._id)
                }
            })
        }else{
            res.status(400).json({
                message: "Admin data not valid"
            })
        }
    }
})


export const admin_signin = asyncHandler(async(req, res) => {
    const{email, password} = req.body

    const admin = await Admin.findOne({email})
    if(!admin || !bcrypt.compareSync(password, admin.password)){
        res.json({error: "Email or password is incorrect"})
    }else{
        res.json({
            status: "ok",
            message:"Login successful",
            data:{
                _id: admin.id,
                    firstName: admin.firstName,
                    middleName: admin.middleName,
                    lastName: admin.lastName,
                    phoneNumber: admin.phoneNumber,
                    email: admin.email,
                    password: admin.password,
                    token: generateToken(admin._id)
            }
        })
    }

})

export const get_all_admins = asyncHandler(async(req, res) => {
    const admins = await Admin.find({})
    res.json({
        status: "ok",
        message: "All admins retrieved",
        data: admins

    })
})

export const get_single_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findOne({_id: req.params.id})
    if(admin){
        res.json({
            status: "ok",
            message: "Admin gotten",
            data: admin
        })
    }
})

export const update_sinlge_admin = asyncHandler(async(req, res) =>{
    const admin = await Admin.findById(req.params.id)
    const {firstName, middleName, 
        lastName, phoneNumber, 
        email, password} = req.body
    if(admin){
        admin.firstName = firstName || admin.firstName
        admin.middleName = middleName || admin.middleName
        admin.lastName = lastName || admin.lastName
        admin.email = email ||admin.email
        admin.phoneNumber = phoneNumber || admin.phoneNumber

        const updatedAdmin = await admin.save()

        if(updatedAdmin){
            res.status(201).json({
                status: "ok",
                message: "Admin updated succesfully",
                data: updatedAdmin
            })
        }else{
            res.json({message: "Something went wrong"})
        }
    }else{
        res.json({error: "admin does not exist"})
    }

    
})


export const delete_single_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.params.id)
    if(admin){
        res.json({
            status:"ok",
            message:"Admin deleted successfully"
        })
    }else{
        res.json({message: "Admin not found"})
    }
})