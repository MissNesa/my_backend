import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Item from "../models/item.js";
import user_router from "../routes/userRoutes.js";

export const create_item = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)
    const {itemName, price, size, typeOfItem, qty, description} = req.body

   if(user){
        const item = await Item.create({
            created_by: req.user.id,
            itemName,
            price,
            size,
            typeOfItem,
            qty,
            availability: false,
            description
        })

        if(item){
            res.json({
                status: "ok",
                message: "Item created successfully",
                data: item
            })
        }else{
            res.json({
            error: "Invalid data inputed"
            })
        }
   }else{
    res.status(400).json({
        error: "User does not exist"
    })
   }
   
})

export const get_paginated_items = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const count = await Item.countDocuments({created_by: req.user._id})
    const item = await Item.find({created_by: user._id})
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    if(user && item){
        res.json({
            status: "ok",
            message: "Paginated items retrieved",
            data: {
                item,
                meta: {
                    page,
                    pages: Math.ceil(count / pageSize),
                    total: count
                }
            }
        })
    }else{
        res.json({
            error: "User has not created an item"
        })
    }
})

export const get_items = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)

    const item = await Item.find({created_by: user._id})

    if(user && item){
        res.json({
            status: "ok",
            message: "Items retrieved",
            data: item
            
        })
    }else{
        res.json({
            error: "user does not have an item"
        })
    }
})

export const get_one_item = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)

    const item = await Item.find({created_by: user._id, _id: req.params.id})

    if(item){
        res.json({
            status: "ok",
            message: "One item gotten",
            data: item
            
        })
    }else{
        res.json({
            error: "This item was not created"
        })
    }
})

export const update_sinlge_item = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)
    const item = await Item.findOne({created_by: req.params.id})
    const {itemName, price, size, typeOfItem, qty,  description} = req.body
    if(user && item){
        item.itemName = itemName || item.itemName
        item.price = price || user.price
        item.size = size || item.size
        item.typeOfItem = typeOfItem || item.typeOfItem
        item.qty = qty ||user.qty
        item.description =  description || user. description

        const updatedItem = await item.save()

        if(updatedItem){
            res.status(201).json({
                status: "ok",
                message: "Item updated succesfully",
                data: updatedItem
            })
        }else{
            res.json({
                message: "Something went wrong"
            })
        }
    }else{
        res.json({
            error: "Item does not exist"
        })
    }

    
})

export const delete_single_item = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)
    const delete_item = await Item.findByIdAndDelete({_id: req.params.id})
    if(user && delete_item){
        res.status(201).json({
            status: "ok",
            message: "Item deleted"
        })
    }else{
        res.json({
            error: "Item not found"
        })
    }
})