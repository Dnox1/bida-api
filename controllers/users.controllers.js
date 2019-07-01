const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.getProfile = (req, res, next) => {
  const {id, securityCode} = req.params
  User.findById(id)
  .then(user => {
    console.log(securityCode, user.securityCode)
    if(!user) {
      throw createError(404, 'User not found')
    } else if (securityCode != user.securityCode){
      throw createError(404, 'Security Code not Match')
    } else {
      res.json(user)
    }
  }) 
  .catch(next)
}