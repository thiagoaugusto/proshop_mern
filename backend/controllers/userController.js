import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// route    POST /api/users/login
// access   Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user profile
// route    GET /api/users/profile
// access   Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    '_id name email isAdmin'
  );

  res.status(200).json(user);
});

export { authUser, getUserProfile };
