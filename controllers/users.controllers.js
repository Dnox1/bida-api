const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.getProfile = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if(!user) {
      throw createError(404, 'User not found')
    } else {
      res.json(user)
    }
  }) 
  .catch(next)
}