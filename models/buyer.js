import mongoose from "mongoose";

const buyerSchema = mongoose.Schema(
    {
        firstName: {type: String},
        middleName: {type: String},
        lastName: {type: String},
        gender: {type: String},
        phoneNumber: {type: String},
        email: {type: String},
        address: {type: String},
        password: {type: String},

    }
)

const Buyer = mongoose.model("Buyer", buyerSchema)
export default Buyer