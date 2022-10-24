import  express  from "express";
import { create_item, delete_single_item, get_one_item, get_paginated_items, update_sinlge_item } from "../controllers/itemController.js";
import { userProtect } from "../middlewares/auth_handler.js";

const item_router = express.Router()


item_router.route("/")
    .post(userProtect, create_item)
    .get(userProtect, get_paginated_items)
item_router.get("/paginated-items", userProtect, get_paginated_items)
item_router.route("/:id")
    .get(userProtect, get_one_item)
    .patch(userProtect, update_sinlge_item)
    .delete(userProtect, delete_single_item)
    
export default item_router

