import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import path from "path"

import {errorHandler} from "./middlewares/error-handler.js";
import connectDB from "./config/db.js";
import user_router from "./routes/userRoutes.js"
import admin_router from "./routes/adminRoutes.js"
import work_router from "./routes/workingHoursRoutes.js"
import item_router from "./routes/itemRoutes.js";

dotenv.config({path: "./config/config.env"});

connectDB().then()
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(errorHandler)
app.use("/api/users", user_router)
app.use("/api/admins", admin_router)
app.use("/api/users", work_router)
app.use("/api/item", item_router)

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)