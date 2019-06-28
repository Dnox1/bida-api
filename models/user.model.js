const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_PATTERN = /^[679]{1}[0-9]{8}$/;
const NIF_PATTERN = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const NIE_PATTERN = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const SSNUMBER_PATTERN = /^[0-9]{12}$/;
const BIDA_URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
// en BIDA_URL_PATTERN poner la estructura de la URL de la APP


const userSchema = new mongoose.Schema({
  // REVISAR QUE OWNER ES CORRECTO.
  owner: {
    type: String,
    default: []
  },
  email: {
    type:String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [EMAIL_PATTERN]
  },
  userName: {
    type: String,
    required: [true, 'user name is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    match: [PASSWORD_PATTERN, 'Passwords must contain at least eight characters, including uppercase, lowercase letters and numbers.']
  },
  userImageURL: {
    type: String,
    unique: [true, 'url image ir required'],
    required: [true, 'Image is need for recognise you ;)'],
    match: [URL_PATTERN, 'Invalid User Image URL Pattern']
  },
  personalData:{
    name: { 
      type: String,
      required: [true, 'your name is required']
    },
    surName: { 
      type: String,
      required: [true, 'Your Surname is required']
    },
    surName2: { type: String },
    mobile: {
      type: String,
      required: [true, 'Your telephone contact is required'],
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
    },
    SocialSecurityNumber: {
      type: String,
      minlength: 12,
      maxlength: 12,
      MATCH: [SSNUMBER_PATTERN, 'Invalid Social Security Number']
    }
  },
  medicalData:{
    bloodType: {
      type: String,
      enum: ['A+','A-','B+','B-','AB+', 'AB-', '0+', '0-'],
      required: [true, 'Like Human you have a Blood Type ;)']
    },
    foodAllergy: {
      type: [String],
      required: [true, 'choose at least one Food Allergy option'],
      enum: ['Unknow', 'Beer',  'Peanut', 'Soy', 'Nickle', 'Egg', 'Sulfates', 'Tree nut', 'Peanut', 'Apples', 'Cinnamon', 'Garlic', 'Chives', 'Mustard', 'Vanilla ', 'Beef', 'Pork', 'Venison', 'Poultry', 'Grass', 'Citrus', 'Sesame', 'Shellfish', 'Mollusk', 'Insect', 'Wheat','Rice flour', 'Coconut flour', 'Almond flour', 'milk', 'Molds']
    },
    medAllergy: {
      type: [String],
      required: [true, 'choose at least one Med Allergy option'],
      enum: ['Unknow', 'Placebo', 'Penicillin', 'Formaldehyde', 'Salicylates', 'Latex', 'steroids','Antihistamines', 'Decongestants', 'Corticosteroids', 'Epinephrine', ' Amoxicillin', 'Aspirin','Ibuprofen']
    },
    ambientalAllergy: {
      type: [String],
      required: [true,'Choose at least one Ambiental Allergy option'],
      enum: ['Unknow', 'Trump`s pollution denies', 'Peanut', 'Grass', 'Pollen', 'Insect stings', 'Cat', 'Dog', 'Cockroaches', 'Latex', 'Molds', 'Dust Mites']
    },
    animalAllergy: {
      type: [String],
      required: [true, 'Choose at least one Animal Allergy option'],
      enum: ['Unknow', 'adorable cat', 'Insect', 'Cat', 'Dog', 'Cockroaches', 'Bee stings']
    },
    othersAllergy: {
      type: [String],
      required: [true, 'Choose at least one Allergy option or nothing'],

    },
    medsINeed: {
      type: [String],
      required: [true, 'Choose at least one Med that you need or nothing']
    },
    diseases: {
      type: [String],
      required: [true, 'Details your diseases or select nothing']
    }
  },
contacts: {
  principalContact: {
    principalContactLink : {
      type: String,
      required: true,
      match: [BIDA_URL_PATTERN, 'Invalid Bida User Link']
    },
    principalContactTag: {
      type: String,
      required: [true, ' Help the assistance to know who will call']
    }
  },
  aditionalContact1: {
    aditionalContact1Link : {
      type: String,
      match: [BIDA_URL_PATTERN, 'Invalid Bida User Link']
    },
    aditionalContact1Tag: {
      type: String,
      required: [true, ' Help the assistance to know who will call']
    }
  },
  aditionalContact2: {
    aditionalContact2Link : {
      type: String,
      match: [BIDA_URL_PATTERN, 'Invalid Bida User Link']
    },
    aditionalContact2Tag: {
      type: String,
    //  required: [true, ' Help the assistance to know who will call']
    }
  },
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