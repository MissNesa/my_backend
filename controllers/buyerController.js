import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {generateToken} from "../utilities/generate_token.js";
import Buyer from "../models/buyer.js";
import Item from "../models/item.js";

export const buyer_signup = asyncHandler(async(req, res) => {
    const {firstName, middleName, lastName, phoneNumber, email, address, gender, password} = req.body
    const buyerExists = await Buyer.find({$or: [{email: email}, {phoneNumber: phoneNumber}]})
    if(buyerExists.length > 0){
        res.json({message: "Buyer already exists"})
    }else{
        const hashedPass = await bcrypt.hash(password, 10)
        const buyer = await Buyer.create({
            firstName, lastName, phoneNumber,
            password: hashedPass, email, gender, address

        })
        if(buyer){
            res.status(201).json({
                status: "ok",
                message: "Buyer created successfully",
                data:{
                    _id: buyer.id,
                    firstName: buyer.firstName,
                    middleName: buyer.middleName,
                    lastName: buyer.lastName,
                    phoneNumber: buyer.phoneNumber,
                    email: buyer.email,
                    gender: buyer.gender,
                    address: buyer.address,
                    password: buyer.password,
                    token: generateToken(buyer._id)
                }
            })
        }else{
            res.status(400).json({
                message: "buyer data not valid"
            })
        }
    }
})


export const buyer_signin = asyncHandler(async(req, res) => {
    const{email, password} = req.body

    const buyer = await Buyer.findOne({email})
    if(!buyer || !bcrypt.compareSync(password, buyer.password)){
        res.json({error: "Email or password is incorrect"})
    }else{
        res.json({
            status: "ok",
            message:"Login successful",
            data:{
                _id: buyer.id,
                    firstName: buyer.firstName,
                    middleName: buyer.middleName,
                    lastName: buyer.lastName,
                    phoneNumber: buyer.phoneNumber,
                    email: buyer.email,
                    gender: buyer.gender,
                    address: buyer.address,
                    password: buyer.password,
                    token: generateToken(buyer._id)
            }
        })
    }

})

export const get_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findOne({_id: req.params.id})
    if(buyer){
        res.json({
            status: "ok",
            message: "Buyer gotten",
            data: buyer
        })
    }
})

export const update_sinlge_buyer = asyncHandler(async(req, res) =>{
    const buyer = await Buyer.findById(req.params.id)
    const {firstName, middleName, 
        lastName, phoneNumber, 
        email, address, gender, password} = req.body
    if(buyer){
        buyer.firstName = firstName || buyer.firstName
        buyer.middleName = middleName || buyer.middleName
        buyer.lastName = lastName || buyer.lastName
        buyer.email = email ||buyer.email
        buyer.address = address || buyer.address
        buyer.gender = gender || buyer.gender
        buyer.phoneNumber = phoneNumber || buyer.phoneNumber

        const updatedBuyer = await buyer.save()

        if(updatedBuyer){
            res.status(201).json({
                status: "ok",
                message: "Buyer updated succesfully",
                data: updatedBuyer
            })
        }else{
            res.json({message: "Something went wrong"})
        }
    }else{
        res.json({error: "Buyer does not exist"})
    }    
})

export const delete_single_buyer = asyncHandler(async(req, res) => {
    const buyer = await Buyer.findById(req.params.id)
    if(buyer){
        res.json({
            status:"ok",
            message:"Buyer deleted successfully"
        })
    }else{
        res.json({message: "Buyer not found"})
    }
})

export const get_all_items = asyncHandler(async(req, res) =>{
    const item = await Item.find({})
    const buyerfind = item.filter(x => x.availability === true)

    if(buyerfind){
        res.json({
            status:"ok",
            message:"All items gotten",
            data: buyerfind
        })
    }else{
        res.json({
            error:"No items available"
        })
    }
})
