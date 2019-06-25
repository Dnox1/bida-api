const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_PATTERN = /^[679]{1}[0-9]{8}$/;
const NIF_PATTERN = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const NIE_PATTERN = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;


const userSchema = new mongoose.Schema({
  email: {
    type:String,
    required: 'email is required',
    unique: true,
    lowercase: true,
    trim: true,
    match: [EMAIL_PATTERN]
  },
  userName: {
    type: String,
    required: 'user name is required',
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    match: [PASSWORD_PATTERN, 'Passwords must contain at least eight characters, including uppercase, lowercase letters and numbers.']
  },
  userImageURL: {
    type: String,
    unique: true,
    required: 'Image is need for recognise you ;)',
    match: [URL_PATTERN, 'Invalid User Image URL Pattern']
  },
  personalData:{
    name: { type: String },
    surName: { type: String },
    surName2: { type: String },
    mobile: {
      type: String,
      match: [PHONE_PATTERN, 'Invalid Phone Number, a spanish phone number is required']
    },
    homePhone: {
      type: String,
      match: [PHONE_PATTERN, 'Invalid Phone Number, a spanish phone number is required']
    },
    workPhone: {
      type: String,
      match: [PHONE_PATTERN, 'Invalid Phone Number, a spanish phone number is required']
    },
    NIF: {
      type: String,
      match: [NIF_PATTERN, 'Invalid NIF Pattern']

    },
    NIE: {
      type: String,
      match: [NIE_PATTERN, 'Invalid NIF Pattern']
    }
  },
  medicalData:{
    bloodType: {
      type: String,
      enum: ['A+','A-','B+','B-','AB+', 'AB-', '0+', '0-']
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc.id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
})

// VALIDACIÓN NIF Y CIF https://www.lawebdelprogramador.com/codigo/JavaScript/1992-Validar-un-CIF-NIF-y-DNI.html

userSchema.pre('save', function (next) {
  const user = this;

  if(!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          next();
        })
      })
      .catch(error => next(error))
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;