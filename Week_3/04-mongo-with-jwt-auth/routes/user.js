const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require(jsonwebtoken)
const jwtPassword = 'secret';

const { Admin, Course, User } = require('../db');

// User Routes
router.post('/signup', async(req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
    
        const alreadyExists = await User.findOne({username});
        if(alreadyExists){
            res.json({message : "User already exists"});
        }
        const newUser = new User({ username, password });
        const savedUser = await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
      }
      catch(error){
          throw error;
      }
});

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    
        const existingAdmin = await User.findOne({username})
    
        if(!existingAdmin) res.json({message : "User not found"}).status(404)
        const token = 'Bearer ' + jwt.sign({ username: username }, jwtPassword);
        res.status(200).json({ token });
    
       } catch (error) {
          console.log(error)
          throw error;
       }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        if (!courses) return res.json({ message: 'No Courses found' }).status(404);
        res.status(200).json({ courses });
      } catch (error) {
        console.log(error);
        throw error;
      }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        const { courseId } = req.params;
        const { username } = req.headers;
        const user = await User.findOne({ username });
        if (!user) return res.status(403).json({ message: 'User not found' });
        const course = await Course.findOne({ _id: courseId });
        user.courses.push(course);
        user.save();
        res.status(200).json({ message: 'Course Purchased successfully' });
      } catch (error) {
        console.log(error);
        throw error;
      }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const { username } = req.headers;
        const user = await User.findOne({ username });
        if (!user) return res.status(403).json({ message: 'User not found' });
        res.status(200).json({ purchasedCourses: user.courses });
      } catch (error) {
        console.log(error);
        throw error;
      }
});
