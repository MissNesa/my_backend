import express from "express";
import { userProtect } from "../middlewares/auth_handler.js";
import { create_workday, get_single_working_hour, update_single_working_hour,delete_single_working_hour } from "../controllers/workingHoursController.js";

const work_router = express.Router()

work_router.route("/work-days-hours")
    .post(userProtect, create_workday)

work_router.route("/work-days-hours/:id")
    .get(userProtect, get_single_working_hour)
    .patch(userProtect, update_single_working_hour)
    .delete(userProtect, delete_single_working_hour)
export default work_router
