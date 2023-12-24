const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();



const Admin = mongoose.model('Admin', AdminSchema);
const Course = mongoose.model('Course', CourseSchema);


app.post('/signup', (req, res) => {
    Admin.create({
        username: req.body.username,
        password: req.body.password
    });
    res.json({
        message: 'Admin created successfully'
    })
});


app.post('/courses', adminMiddleware, (req, res) => {
  Course.create( { 
    title: req.body.title, 
    description: req.body.description, 
    price: req.body.price, 
    imageLink: req.body.image 
})
 res.json({
    message :'Course created successfully'
 })

});


app.get('/courses', adminMiddleware, (req, res) => {
    Course.find().then(
        courses => {
            res.json(courses);
        })
});

module.exports = router;