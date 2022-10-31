import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import Buyer from "../models/buyer.js";
import superAdmin from "../models/superAdmin.js";

const userProtect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not Authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not Authorized')
	}
})

export {userProtect}


const superAdminProtect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.superAdmin = await superAdmin.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not Authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not Authorized')
	}
})


export {superAdminProtect}

const buyerProtect = asyncHandler(async(req, res, next) =>{
	let token

	if(
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try{
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token,process.env.JWT_SECRET)
			req.user = await Buyer.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error('Not Authorized')
		}
	}
	if(!token){
		res.status(401)
		throw new Error('Not Authorized')
	}
})
export {buyerProtect}