const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
});


const projectSchema = new mongoose.Schema({
    projectId:{
        type:String,
        required:true,
        unique:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'There should be at least one project image.'
      }
    }
  });
  
  const Project = mongoose.model('Project', projectSchema);
  

const Admin = mongoose.model('Admin',userSchema);
module.exports = {
    Admin,Project
};
