const express =require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const app=express();
const adminRouter = require('./routes/admin')
const path = require('path');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://vishal2001lohar:Vishal123@cluster0.x3os1qm.mongodb.net/', { dbName: "mHouseInterior" });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin',adminRouter);

app.listen(3000, () => console.log('Server running on port 3000'));