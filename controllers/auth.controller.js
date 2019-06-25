const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport')

module.exports.register = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email:email })
    .then(user => {
      if(user) {
        throw createError(409, 'email already exist')
      } else {
        return new User(req.body).save();
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('auth-local', (error, user, message) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, message));
    } else {
      req.login(user, (error) => {
        if(error) {
          next(error)
        } else {
          res.status(201).json(user);
        }
      })
    }
  })(req, res, next)
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}

module.exports.getProfile = (req, res, next) => {
  throw createError(501, 'Not Implemented')
}

module.exports.editProfile = (req, res, next) => {
  throw createError(501, 'Not Implemented')
}


// module.exports.getProfile = (req, res, next) => {
//   User.findById(req.params.id)
//   .then(user => {
//     if(!user) {
//       throw createError(404, 'User not found')
//     } else {
//       res.json(user)
//     }
//   }) 
//   .catch(next)
// }