const Admin = require("../db/index")

async function adminMiddleware(req, res, next) {

    const { username, password } = req.headers;

    const admin = await Admin.findOne({ username, password });

    if(admin){
        next();
    }
    else{
        res.status(401).json({ error: 'Invalid admin credentials' });
    }
}

module.exports = adminMiddleware;