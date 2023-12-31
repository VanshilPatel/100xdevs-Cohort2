const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vanshil:abc1234@cluster0.y9eqc21.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String, 
    password: String 
});



const CourseSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    price: Number, 
    imageLink: String 
});

const UserSchema = new mongoose.Schema({
    username: String, 
    password: String,
    courses: [CourseSchema]
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}