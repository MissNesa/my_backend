import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
    {
        firstName: {type: String},
        middleName: {type: String},
        lastName: {type: String},
        phoneNumber: {type: String},
        email: {type: String},
        password: {type: String},

    }
)

const Admin = mongoose.model("Admin", adminSchema)
export default Admin