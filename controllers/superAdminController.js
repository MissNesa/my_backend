import asyncHandler from "express-async-handler";
import bcrypts from "bcryptjs"
import { generateToken } from "../utilities/generate_token.js";
import superAdmin from "../models/superAdmin.js";
import User from "../models/superAdmin.js";
import Buyer from "../models/buyer.js";
import Item from "../models/item.js";


export const create_admin = asyncHandler(async(req, res) => {
    const {firstName, middleName, lastName, email, password, phoneNumber} = req.body
    const superexist = await superAdmin.find({})
    console.log(superexist)
    const adminexist = await superAdmin.find({email:email}, {phoneNumber:phoneNumber})
    if(superexist.length == 0 && adminexist.length == 0){
        const hashed = await bcrypts.hash(password, 10)
        const admin = await superAdmin.create({firstName, middleName, lastName, email, password: hashed, superAdmin: true, phoneNumber})
        if(admin){
            res.json({
                status: "ok",
                message: "superAdmin created",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    email: admin.email,
                    phoneNumber: admin.phoneNumber,
                    password: admin.password,
                    superAdmin: admin.superAdmin,
                    token: generateToken(admin._id)
                }
            })
        }else{
            res.json({
                message: "incorrect info"
            })
        }
    }else if(adminexist.length > 0){
        throw new Error("admin already exists")
    }else{
        const hashed = await bcrypts.hash(password, 10)
        const admin = await superAdmin.create({firstName, middleName, lastName, email, phoneNumber, password: hashed})
        if(admin){
            res.json({
                status: "ok",
                message: "You are now an admin",
                data: {
                    _id: admin._id,
                    firstname: admin.firstname,
                    middlename: admin.middlename,
                    lastname: admin.lastname,
                    email: admin.email,
                    phoneNumber: admin.phoneNumber,
                    password: admin.password,
                    superAdmin: admin.superAdmin,
                    token: generateToken(admin._id)
                }
            })
        }else{
            res.json({
                message: "Incorrect info"
            })
        }
    }
})

export const admin_signin = asyncHandler(async(req, res) => {
    const{email, password} = req.body

    const admin = await superAdmin.findOne({email})
    if(!admin || !bcrypts.compareSync(password, admin.password)){
        res.json({error: "Email or password is incorrect"})
    }else{
        res.json({
            status: "ok",
            message:"Login successful",
            data:{
                firstName: admin.firstName,
                middleName: admin.middleName,
                lastName: admin.lastName,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                password: admin.password,
                token: generateToken(admin._id)
            }
        })
    }

})


export const adminGetAll = asyncHandler(async(req, res) =>{
    const admin = await superAdmin.findById(req.superAdmin.id)
    if(admin.superAdmin === true){
        const buyer = await Buyer.find({})
        const user = await User.find({})
        const item = await Item.find({})

        res.json({
            status: "ok",
            message: "All data gotten",
            data:{
                buyer,
                user,
                item
            }
        })
    }else{
        res.json({
            error: "You are not the superAdmin"
        })
    }
})


export const get_all_admins = asyncHandler(async(req, res) =>{
    const admin = await superAdmin.find({})
    if(admin){
        res.json({
            status: "ok",
            message: "All admins gotten",
            data: admin
        })
    }else{
        res.json({
            error: "No admin found"
        })
    }
})

export const get_all_false_admins = asyncHandler(async(req, res) =>{
    const admin = await superAdmin.findById(req.superAdmin.id)
    if(admin.superAdmin === true){
        const allAdmins = await superAdmin.find({})
        const falseAdmins = allAdmins.filter(admin => admin.superAdmin = false)
        res.json({
            status: "ok",
            message: "All false admins gotten",
            data: falseAdmins
        })
    }else{
        res.json({
            message: "You're not the superAdmin"
        })
    }
})

export const get_single_admin = asyncHandler(async(req, res) => {
    const admin = await superAdmin.findById({_id:req.params.id})
    if(admin){
        res.json({
            status: "ok",
            message: "Admin gotten",
            data: admin
        })
    }else{
        res.json({message: "Profile not found"})
    }
})


export const updateself = asyncHandler(async(req, res) => {
    const admin = await superAdmin.findOne({_id:req.params.id})
    const {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        password,
    } = req.body
    if(admin){
        admin.firstName = firstName || admin.firstName,
        admin.middleName = middleName || admin.middleName,
        admin.lastName = lastName || admin.lastName,
        admin.email = email || admin.email,
        admin.phoneNumber = phoneNumber || admin.phoneNumber,
        admin.password = password || admin.password
    }

    const update = await admin.save()
    if(update){
        res.json({
            status: "ok",
            message: "Admin updated successfully",
            data: update
        })
    }else{
        res.json({
            message: "Something went wrong"
        })
    }
})

export const deleteadmin = asyncHandler(async(req, res) => {
    const su = await superAdmin.find({_id:req.params.id})
    const sup = su[0].superAdmin == true
    const {_id} = req.body
    if(sup){
        const supe = await superAdmin.findByIdAndDelete({_id})
        if(supe){
            res.json({
                seatus: "ok",
                message: "Account deleted permanently"
            })
        }else{
            res.json({
                error: "invalid info"
            })
        }
    }
})

