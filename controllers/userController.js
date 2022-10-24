import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {generateToken} from "../utilities/generate_token.js";
import User from "../models/user.js";

export const user_signup = asyncHandler(async(req, res) => {
    const {firstName, middleName, lastName, age, phoneNumber, email, address, gender, password} = req.body
    const userExists = await User.find({$or: [{email: email}, {phoneNumber: phoneNumber}]})
    if(userExists.length > 0){
        res.json({message: "User already exists"})
    }else{
        const hashedPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            firstName, lastName, phoneNumber, age,
            password: hashedPass, email, gender, address

        })
        if(user){
            res.status(201).json({
                status: "ok",
                message: "User created successfully",
                data:{
                    _id: user.id,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    age: user.age,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    gender: user.gender,
                    address: user.address,
                    password: user.password,
                    token: generateToken(user._id)
                }
            })
        }else{
            res.status(400).json({
                message: "user data not valid"
            })
        }
    }
})


export const user_signin = asyncHandler(async(req, res) => {
    const{email, password} = req.body

    const user = await User.findOne({email})
    if(!user || !bcrypt.compareSync(password, user.password)){
        res.json({error: "Email or password is incorrect"})
    }else{
        res.json({
            status: "ok",
            message:"Login successful",
            data:{
                _id: user.id,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    age: user.age,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    gender: user.gender,
                    address: user.address,
                    password: user.password,
                    token: generateToken(user._id)
            }
        })
    }

})

export const get_all_users = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({
        status: "ok",
        message: "All users retrieved",
        data: users

    })
})

export const get_single_user = asyncHandler(async(req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user){
        res.json({
            status: "ok",
            message: "User gotten",
            data: user
        })
    }
})

export const update_sinlge_user = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.params.id)
    const {firstName, middleName, 
        lastName, age, phoneNumber, 
        email, address, gender, password} = req.body
    if(user){
        user.firstName = firstName || user.firstName
        user.middleName = middleName || user.middleName
        user.lastName = lastName || user.lastName
        user.age = age || user.age
        user.email = email ||user.email
        user.address = address || user.address
        user.gender = gender || user.gender
        user.phoneNumber = phoneNumber || user.phoneNumber

        const updatedUser = await user.save()

        if(updatedUser){
            res.status(201).json({
                status: "ok",
                message: "User updated succesfully",
                data: updatedUser
            })
        }else{
            res.json({message: "Something went wrong"})
        }
    }else{
        res.json({error: "User does not exist"})
    }

    
})


export const delete_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.json({
            status:"ok",
            message:"User deleted successfully"
        })
    }else{
        res.json({message: "User not found"})
    }
})