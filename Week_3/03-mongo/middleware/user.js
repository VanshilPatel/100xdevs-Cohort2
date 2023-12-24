const User = require("../db/index")

async function userMiddleware(req, res, next) {

        const { username, password } = req.headers;    
        const user = await Admin.User.findOne({ username, password });

        if(user){
            next();
        }
        else{
            res.status(401).json({ error: 'Invalid user credentials' });
        }
    }
    


module.exports = userMiddleware;