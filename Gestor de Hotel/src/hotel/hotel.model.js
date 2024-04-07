import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    addres: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    }
},    {
        versionKey: false
})

export default mongoose.model('hotel', hotelSchema)