import express from "express"
import { buyer_signup, delete_single_buyer, get_single_buyer, update_sinlge_buyer } from "../controllers/buyerController.js";
import { buyerProtect } from "../middlewares/auth_handler.js";

const buyer_router = express.Router()

buyer_router.route("/")
    .post(buyer_signup)
buyer_router.post("/buyer-signin", buyer_signup)
buyer_router.route("/:id")
    .get(buyerProtect, get_single_buyer)
    .patch(buyerProtect, update_sinlge_buyer)
    .delete(buyerProtect, delete_single_buyer)


export default buyer_router
