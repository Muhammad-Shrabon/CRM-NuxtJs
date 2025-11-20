import mongoose from "mongoose";

const deliverySc = new mongoose.Schema({
    projectID:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true
    },
    freelancerID:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
        required: true
    },
    files: [{type: String, required: true }], 
    status: {type: String, default: 'pending' }, 
},{ timestamps: true })

export default mongoose.models.Delivery || mongoose.model('Delivery', deliverySc)