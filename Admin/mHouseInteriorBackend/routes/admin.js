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
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

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
      const existingAdmin = await prisma.user.findFirst({
        where:{
          username:username
        }
      })
      if (existingAdmin) {
          return res.status(403).json({ msg: "Admin already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin
      const admin = await prisma.user.create({ 
        data:{
          username:username,
          password: hashedPassword
        },
        select:{
          id:true
        }
       })
       console.log(admin.id);
      // Generate token
      const token = jwt.sign({ id:admin.id,username:username, role: 'admin' }, process.env.SECRET, { expiresIn: '3h' });
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
      const admin = await prisma.user.findFirst({
        where:{
          username:username
        }
      })
      if (!admin) {
          return res.status(401).json({ msg: 'Invalid username or password' });
      }
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(401).json({ msg: 'Invalid username or password' });
      }
      // Generate token
      const token = jwt.sign({ id:admin.id,username:username, role: 'admin' }, process.env.SECRET, { expiresIn: '3h' });
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
    const admin = await prisma.user.findFirst({
      where:{
        username:username
      }
    })
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
    const result = await prisma.user.update({
      where:{username},
      data:admin,
    });
    console.log(result);
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

// Configure Multer with file type validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists and is writable
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
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
  { name: 'images[]', maxCount: 5 },
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
router.post('/addProject', authenticateJwt, async (req, res) => {
  try {
    // Handle file uploads
    await uploadMiddleware(req, res);

    const { name, address } = req.body;
    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address are required' });
    }

    const userId = req.user.id; // Assuming the JWT payload contains 'id'

    // Access uploaded files
    const profileImage = req.files['profileImage'] && req.files['profileImage'][0] ? req.files['profileImage'][0].path : '';
    const images = req.files['images[]'] ? req.files['images[]'].map(file => file.path) : [];

    const projectData = {
      name,
      address,
      profileImage,
      images,
      userId
    };

    const newProject = await prisma.project.create({
      data: projectData,
      select: {
        id: true,
        name: true,
        address: true,
        profileImage: true,
        images: true,
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

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

router.get('/getProjectById', async (req, res) => {
    try {
      const { projectId } = req.query;
  
      if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
      }
  
      const projectIdInt = parseInt(projectId, 10);
      // Find the project by its projectId
      const project = await prisma.project.findFirst({
        where:{
          id:projectIdInt
        }
      })
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'An error occurred while fetching the project', error });
    }
  });
  router.get('/getAllProjects', async (req, res) => {
    try {
        // Fetch all projects
        const allProjects = await prisma.project.findMany();

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

router.put('/updateProject', authenticateJwt, async (req, res) => {
  try {
    const { projectId } = req.query;
    const { name, address } = req.body; // Add `retainedImages` to manage existing images
    await uploadMiddleware(req, res);

    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const projectIdInt = parseInt(projectId, 10);

    const existingImages = Array.isArray(req.body['existingImages'])
      ? req.body['existingImages']
      : req.body['existingImages']
      ? [req.body['existingImages']]
      : [];

    // Find the existing project
    const existingProject = await prisma.project.findUnique({
      where: { id: projectIdInt },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Process uploaded files
    const newProfileImage =
      req.files['profileImage'] && req.files['profileImage'][0]
        ? req.files['profileImage'][0].path
        : null;

    const newImages = req.files['images[]']
      ? req.files['images[]'].map((file) => file.path)
      : [];

    // Combine retained images (sent in the request body) with newly uploaded images
    const updatedImages = [
      ...existingImages, // These are the images the user decided to keep
      ...newImages, // These are the newly uploaded images
    ];

    // Remove old profile image if a new one is uploaded
    if (newProfileImage && existingProject.profileImage) {
      const oldProfileImagePath = path.resolve(existingProject.profileImage);
      if (fs.existsSync(oldProfileImagePath)) {
        fs.unlinkSync(oldProfileImagePath);
      }
    }

    // Remove images that are no longer retained
    const removedImages = existingProject.images.filter(
      (image) => !existingImages.includes(image)
    );
    removedImages.forEach((imagePath) => {
      const resolvedPath = path.resolve(imagePath);
      if (fs.existsSync(resolvedPath)) {
        fs.unlinkSync(resolvedPath);
      }
    });

    // Update the project with new data
    const updatedData = {
      name: name || existingProject.name,
      address: address || existingProject.address,
      profileImage: newProfileImage || existingProject.profileImage,
      images: updatedImages,
    };

    const updatedProject = await prisma.project.update({
      where: { id: projectIdInt },
      data: updatedData,
      select: {
        id: true,
        name: true,
        address: true,
        profileImage: true,
        images: true,
      },
    });

    res
      .status(200)
      .json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    if (error instanceof multer.MulterError) {
      res.status(400).json({ message: 'File upload error', error: error.message });
    } else {
      res
        .status(500)
        .json({ message: 'An error occurred while updating the project', error });
    }
  }
});

  
  // DELETE route to delete a project by projectId
  router.delete('/deleteProject', authenticateJwt, async (req, res) => {
    try {
        const { projectId } = req.query;

        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }

        const projectIdInt = parseInt(projectId, 10);

        // Find the project by ID and delete it
        const deletedProject = await prisma.project.delete({
            where: { id: projectIdInt }
        });

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            // Prisma's record not found error
            res.status(404).json({ message: 'Project not found' });
        } else {
            console.error('Error deleting project:', error);
            res.status(500).json({ message: 'An error occurred while deleting the project', error });
        }
    }
});


  module.exports=router;