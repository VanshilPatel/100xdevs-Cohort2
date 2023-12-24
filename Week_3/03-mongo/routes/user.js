const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


app.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    });
    res.json({
        message: 'User created successfully'
    })
});


app.get('/courses', (req, res) => {
    Course.find().then(
        courses => {
            res.json(courses);
        })
});

app.post('/courses/:courseId', userMiddleware, (req, res) => {
   
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {
   
});
