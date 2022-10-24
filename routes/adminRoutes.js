import express from "express"
import { admin_signin, admin_signup, delete_single_admin, get_all_admins, get_single_admin, update_sinlge_admin } from "../controllers/adminController.js"
import { userProtect } from "../middlewares/auth_handler.js"


const admin_router = express.Router()

admin_router.route("/")
    .post(admin_signup)
    .get(get_all_admins)
admin_router.post("/admin-signin", admin_signin)
admin_router.route("/:id")
    .get(userProtect, get_single_admin)
    .put(userProtect, update_sinlge_admin)
    .delete(userProtect, delete_single_admin)



export default admin_router
