import mongoose from "mongoose";

const superAdminSchema = mongoose.Schema(
    {
        firstName: {type : String},
        middleName: {type : String},
        lastName: {type : String},
        email: {type : String},
        password: {type : String},
        phoneNumber:{type: String},
        superAdmin: {
            type: Boolean, 
            default: false
        }    
    }
)

const superAdmin = mongoose.model("superAdmin", superAdminSchema)
export default superAdmin