const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require(jsonwebtoken)
const jwtPassword = 'secret';
const router = Router();
const { Admin, Course } = require('../db');

// Admin Routes
router.post('/signup', async (req, res) => {
  try{
    const username = req.body.username;
    const password = req.body.password;

    const alreadyExists = await Admin.findOne({username});
    if(alreadyExists){
        res.json({message : "Admin already exists"});
    }
    const newAdmin = new Admin({ username, password });
    const savedAdmin = await newAdmin.save();
    res.status(200).json({ message: 'Admin created successfully' });
  }
  catch(error){
      throw error;
  }
});

router.post('/signin', async (req, res) => {
   try {
    const username = req.body.username;
    const password = req.body.password;

    const existingAdmin = await Admin.findOne({username})

    if(!existingAdmin) res.status(404).json({message : "Admin not found"})
    const token = 'Bearer ' + jwt.sign({ username: username }, jwtPassword);
    res.status(200).json({ token });

   } catch (error) {
      console.log(error)
      throw error;
   }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        await Course.create({ title, description, price, image });
        res.json({
          message: 'Course added successfully',
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
      } catch (error) {
        console.log(error);
        throw error;
      }
});

module.exports = router;