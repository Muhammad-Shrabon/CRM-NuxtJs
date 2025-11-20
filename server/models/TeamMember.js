import mongoose from "mongoose";

const teamMemberSc = new mongoose.Schema({
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
    members: [{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  assignBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}], 
},{ timestamps: true })

export default mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSc)