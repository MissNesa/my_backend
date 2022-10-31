import express from "express";
import { superAdminProtect } from "../middlewares/auth_handler.js";
import { adminGetAll, admin_signin, create_admin, deleteadmin, get_all_admins, get_all_false_admins, get_single_admin, updateself } from "../controllers/superadmincontroller.js";
const superAdmin_router = express.Router()

superAdmin_router.route("/")
     .post(create_admin)
     .get(admin_signin)
superAdmin_router.get("/all", superAdminProtect, adminGetAll)
superAdmin_router.get("/all-admins", get_all_admins)
superAdmin_router.get("/false-admins", get_all_false_admins)
superAdmin_router.route("/:id")
     .get(superAdminProtect, get_single_admin)
     .patch(superAdminProtect, updateself)
     .delete(superAdminProtect, deleteadmin)
     
export default superAdmin_router