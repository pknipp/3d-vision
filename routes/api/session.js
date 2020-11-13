const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const UserRepository = require('../../db/user-repository');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

const email = check('email').isEmail().withMessage('Provide valid email').normalizeEmail();
const password = check('password').not().isEmpty().withMessage('Provide password');

router.get('/', asyncHandler(async function (req, res, next) {res.json({message: "Hello world"});}));

router.put('/', [email, password],
  asyncHandler(async (req, res, next) => {
<<<<<<< HEAD:routes/api/session.js
  console.log("top of login route handler, with ", email, password)
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next({ status: 422, errors: errors.array() });
  return res.json({message: "return from line 21"});
=======
  // console.log("top of login route handler, with ", email, password)
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ status: 422, errors: errors.array() });
  // return res.json({message: "return from line 21"});
>>>>>>> login:BrainScapeClone/old/nonRedux/routes/api/session.js
  const { email, password } = req.body;
  let user;
  try {
    user = await UserRepository.findByEmail(email);
  } catch (e) {
    return next({ status: 401, message: "UserRepo.findByEmail did not work" });
  }
  if (!user.isValidPassword(password)) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['Invalid credentials'];
    return next(err);
  }
  const { jti, token } = generateToken(user);
  user.tokenId = jti;
  await user.save();
  res.cookie('token', token);
  res.json({ token, user: user.toSafeObject() });
}));

router.delete('/', [authenticated],
  asyncHandler(async (req, res) => {
  req.user.tokenId = null;
  await req.user.save();
  res.clearCookie('token');
  res.json({ message: 'success' });
}));

module.exports = router;
