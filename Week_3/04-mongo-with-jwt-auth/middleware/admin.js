// Middleware for handling auth
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

function adminMiddleware(req, res, next) {
    let token = req.headers.authorization;
    if(!token){
        res.json({message : "Token not found"}).status(404);
    }
    try{
        token = token.replace('Bearer' , '');
        jwt.verify(token, jwtPassword);
        next();
    }
    catch{
        res.json({message : "Invalid token"}).status(401);
    }
   
}

module.exports = adminMiddleware;