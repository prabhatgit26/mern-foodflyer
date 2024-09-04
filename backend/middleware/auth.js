import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again." });
    }
  
    try {
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = tokenDecode.id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ success: false, message: "Invalid Token." });
    }
  };
  

export default authMiddleware;
