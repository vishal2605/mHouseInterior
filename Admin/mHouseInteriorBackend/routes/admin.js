const express = require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const router=express.Router();
const multer = require('multer');
const path = require('path');
const {Admin,Project} = require('../db');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const nodemailer= require('nodemailer');
const { authenticateJwt } = require('../middleware/auth');

let transporter= nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmail.com',
  auth:{
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_PASS
  }
})


const sendEmail = async (to,subject, text,html)=>{
  try{
    let info = await transporter.sendMail({
      from: {
        name: "mHouseInterior",
        address: process.env.GMAIL_USER
      },
      to:to,
      subject:subject,
      text:text,
      html:html
    });
    console.log('Email sent: %s',info.messageId);
    return { success: true, messageId: info.messageId };
  }
  catch (error){
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}
router.post('/send-email',async (req,res) =>{
  const {to, subject, text, html }= req.body;
  console.log(process.env.GMAIL_USER);
  const result = await sendEmail(to,subject,text,html);

  if(result.success){
    res.status(200).json({msg:'Email sent successfully'});
  }
  else{
    res.status(500).json({msg:'Failed to sent email', details:result.error});
  }
})

router.post('/signup', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
          return res.status(403).json({ msg: "Admin already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();

      // Generate token
      const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '3h' });
      res.json({ msg: 'Admin created successfully', token });
  } catch (error) {
      res.status(500).json({ msg: 'Error creating admin', error });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
          return res.status(401).json({ msg: 'Invalid username or password' });
      }

      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(401).json({ msg: 'Invalid username or password' });
      }

      // Generate token
      const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '3h' });
      res.json({ message: 'Logged in successfully', token });
  } catch (error) {
      res.status(500).json({ msg: 'Error logging in', error });
  }
});


router.post('/changepassword',authenticateJwt, async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // Validate inputs
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect old password' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);

    // Save the updated admin
    await admin.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Ensure the uploads directory exists
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Configure Multer with file type validation
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
    cb(null, true);
  },
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'images', maxCount: 5 },
]);
const uploadMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

// Add Project endpoint
router.post('/addProject',authenticateJwt, async (req, res) => {
  try {
    await uploadMiddleware(req, res);

    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required' });
    }

    const project = {
      projectId: uuidv4(),
      name,
      address,
      profileImage: req.files['profileImage'] ? req.files['profileImage'][0].path : '', 
      images: req.files['images'] ? req.files['images'].map(file => file.path) : [], 
    };

    const newProject = new Project(project);
    await newProject.save();

    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (err) {
    console.error('Error in /addProject:', err);
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: 'File upload error', error: err.message });
    } else {
      res.status(500).json({ message: 'An error occurred while adding the project', error: err.message });
    }
  }
});  
  

router.get('/getProjectById',authenticateJwt, async (req, res) => {
    try {
      const { projectId } = req.query;
  
      if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
      }
  
      // Find the project by its projectId
      const project = await Project.findOne({ projectId });
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'An error occurred while fetching the project', error });
    }
  });

  router.get('/getAllProjects',authenticateJwt, async (req, res) => {
    try {
        const allProjects = await Project.find();

        if (allProjects && allProjects.length > 0) {
            res.status(200).json(allProjects);
        } else {
            res.status(404).json({ message: 'No records found in the database' });
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'An error occurred while fetching the projects', error });
    }
  });

  router.put('/updateProject',authenticateJwt, async (req, res) => {
    try {
      const { projectId } = req.query;
      const { name, address } = req.body;

      if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
      }
      const existingProject= await Project.findOne({projectId:projectId});
      console.log(existingProject);
      if(!existingProject){
        return res.status(404).json({message:'Project not found'});
      }
      if(existingProject.profileImage){
        const oldPhotoImagePath = path.join(__dirname,'uploads',path.basename(existingProject.profileImage));
        if(fs.existsSync(oldPhotoImagePath)){
          fs.unlinkSync(oldPhotoImagePath);
        }
      }
      existingProject.images.forEach(imagePath =>{
        const oldImagePath = path.join(__dirname,'uploads',path.basename(imagePath));
        if(fs.existsSync(oldImagePath)){
          fs.unlinkSync(oldImagePath);
        }
      });

      existingProject.name=name
      existingProject.address=address
      existingProject.profileImage= req.files['profileImage'] ? req.files['profileImage'][0].path: existingProject.profileImage;
      existingProject.images = req.files['images'] ? req.files['images'].map(file => file.path):existingProject.images;

      await existingProject.save();
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ message: 'An error occurred while updating the project', error });
    }
  });
  
  // DELETE route to delete a project by projectId
  router.delete('/deleteProject',authenticateJwt, async (req, res) => {
    try {
      const { projectId } = req.query;
  
      if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
      }
      const deletedProject = await Project.findOneAndDelete({ projectId });
  
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'An error occurred while deleting the project', error });
    }
  });

  module.exports=router;