import mongoose, { Schema } from "mongoose";

const beedromsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    hotel:{
        type: Schema.Types.ObjectId,
        ref: 'hotel', 
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    number:{
        type:Number,
        required: true
    }
},    {
    versionKey: false
})

export default mongoose.model('beedrooms', beedromsSchema)