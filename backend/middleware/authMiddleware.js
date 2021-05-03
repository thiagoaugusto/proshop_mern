import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = jwt.verify(token, process.env.JWT_TOKEN);

  req.user = decoded;

  next();
};

export default protect;
