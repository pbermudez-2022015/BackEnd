import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dateStart: { 
        type: Date,
        required: true 
    },
    dateEnd: { 
        type: Date,
        required: true 
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'hotel',
        required: false 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: false  
    },
    servicesAdditional: [{
        type: String,
        required: false
    }],

},    {
        versionKey: false
})

export default mongoose.model('event', eventSchema)