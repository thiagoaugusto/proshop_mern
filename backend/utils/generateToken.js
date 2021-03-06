import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_TOKEN, { expiresIn: '30d' });
};

export default generateToken;
