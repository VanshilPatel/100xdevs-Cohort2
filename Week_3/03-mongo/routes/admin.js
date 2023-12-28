const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const {Course, Admin } = require('../db');





router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin)
          return res.status(400).json({ message: 'Admin Already existing' });
        const newAdmin = await new Admin({ username, password });
        const savedAdmin = newAdmin.save();
        res.status(200).json({ message: 'Admin created successfully' });
      } catch (error) {
        console.log(error);
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