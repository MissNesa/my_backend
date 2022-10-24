import express from "express"
import { user_signup, user_signin, get_all_users, get_single_user, update_sinlge_user, delete_single_user } from "../controllers/userController.js"
import { userProtect } from "../middlewares/auth_handler.js"


const user_router = express.Router()

user_router.route("/")
    .post(user_signup)
    .get(get_all_users)
user_router.post("/user-signin", user_signin)
user_router.route("/:id")
    .get(userProtect, get_single_user)
    .put(userProtect, update_sinlge_user)
    .delete(userProtect, delete_single_user)



export default user_router
