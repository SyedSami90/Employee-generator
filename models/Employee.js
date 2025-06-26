import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: String,
    language: String,
    city: String
})

export default mongoose.model('Employee',employeeSchema)