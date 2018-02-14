var User = require('../models/user.js');
var messages = require('../config/messages.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var mailer = require('../helpers/mailer.js');
var fileWriter = require("../helpers/file_writer.js");


const userDB = {};

userDB.findOneById = function (id, done) {
  User.findOne({ "_id": id }).select('email').exec(function (err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user);
    }
  })
}

userDB.findOneUser = function (email, done) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return res.json({ success: false, message: 'Technical issue occured' });
      } else if (!user) {
        return res.json({ success: false, status: 404, message: 'User not found' });
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          var token = jwt.sign({ username: user.username, email: user.email }, 'jiyawebsite', { expiresIn: '2h' });
          return res.json({ success: true, message: 'user Authenticated', token: token });
        } else {
          return res.json({ success: false, message: 'Invalid Password' });
        }
      })
    });
}

User.getUserByEmail = (function (email, done) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      done(res.json({ success: false, message: 'Technical issue occured' }), null);
    } else if (!user) {
      done(res.json({ success: false, status: 404, message: 'User not found' }), null);
    } else {
      done(null, user);
    }
  });
});

userDB.addUser = function (userData, done) {
  User.findOne({ "email": userData.email }, function (err, data) {
    if (err) {
      return done(err);
    } else if (data) {
      return done(null, messages.errors.user_exists);
    }
    userData.temporaryToken = jwt.sign({ username: userData.username, email: userData.email }, 'jiyawebsite', { expiresIn: '24h' });
    userData.isNewUser = true;
    userData.save().then(() => {
      mailer.activationMail(userData.email, userData.username, userData.temporaryToken, function (err, data) {
        if (err) { return done(err); }
        else {
          return done(null, messages.success.user_created);
        }
      });
    })
      .catch((err) => {
        return done(null, messages.errors.required_missing);
      });
  });
};

userDB.authenticateUser = function (email, password, done) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return done(err);
    } else if (!user) {
      return done(null, messages.errors.user_not_found);
    }
    else if (!user.active) {
      return done(null, messages.errors.user_inactive);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        var token = jwt.sign({ user: user }, 'jiyawebsite', { expiresIn: '24h' });
        return done(null, { success: true, message: 'user Authenticated', token: token });
      } else {
        return done(null, messages.errors.invalid_password);
      }
    })
  });
};

userDB.activateUser = function (token, done) {
  User.findOne({ temporaryToken: token }, function (err, user) {
    if (err) {
      return done(err);
    }
    jwt.verify(token, 'jiyawebsite', function (err, decoded) {
      if (err) {
        return done(null, messages.errors.link_expired);
      } else if (!user) {
        return done(null, messages.errors.link_expired);
      } else {
        user.temporaryToken = "NIL";
        user.active = true;
        userDB.saveUser(user, function (err, data) {
          if (err) {
            return done(err);
          } else {
            return done(null, { success: true, message: "successfully activated" });
          }
        });
      }
    });
  })
}

userDB.saveUser = function (user_obj, done) {
  user_obj.save(function (err) {
    if (err) {
      return done(err);
    } else {
      mailer.welcomeMail(user_obj.email, function (err, data) {
        if (err) {
          return done(err);
        } else {
          return done(null, { status: "success" });
        }
      })
    }
  })
}


userDB.updateProfile = function (user_obj, done) {
  User.findOne({ "_id": user_obj.id }, function (err, user) {
    if (err) {
      return done(err);
    }
    user.username = user_obj.username;
    //user.profilePic = user_obj.profilePic;
    user.penName = user_obj.penName;
    user.shortBio = user_obj.shortBio;
    user.privacyPolicy = user_obj.privacyPolicy;
    user.favourites = user_obj.favourites;
    user.isNewUser = false;
    if (user_obj.birthday) {
      user.dateOfBirth = new Date(user_obj.birthday);
    } else {
      user.dateOfBirth = user_obj.dateOfBirth
    }
    user.location = user_obj.location;
    if (user_obj.profilePic) {
      fileWriter.writeProfileImage(user_obj.profilePic, function (err, path) {
        if (err) {
          return done(err);
        } else {
          user.profilePic = path;
          user.save(function (err) {
            if (err) {
              return done(err);
            } else {
              var token = jwt.sign({ user: user }, 'jiyawebsite', { expiresIn: '24h' });
              return done(null, { success: true, message: 'profile updated', token: token });
            }
          })
        }
      });
    } else {
      user.save(function (err) {
        if (err) {
          return done(err);
        } else {
          var token = jwt.sign({ user: user }, 'jiyawebsite', { expiresIn: '24h' });
          return done(null, { success: true, message: 'profile updated', token: token });
        }
      })
    }
  })
}

userDB.validateToken = function (token, done) {
  if (token) {
    jwt.verify(token, 'jiyawebsite', function (err, decoded) {
      if (err) {
        done(null, { success: false, message: 'Token Invalid' });
      } else {
        done(null, { success: true, "user": decoded.user });
      }
    });
  } else {
    done(null, { success: false, message: "No token provided" });
  }
}

userDB.getAllusers = function (role, done) {
  if (role == 'super_admin') {
    userDB.findBySuperUser(function (err, response) {
      if (err) { done(err); }
      else {
        done(null, response);
      }
    })
  } else if (role == 'admin') {
    userDB.findByAdmin(function (err, response) {
      if (err) { done(err); }
      else {
        done(null, response);
      }
    })
  } else {
    done(null, { success: false, message: "Permission denied" });
  }
}

userDB.findBySuperUser = function (done) {
  User.find({ "role": { '$ne': "super_admin" } }, 'firstName lastName email role featuredContent deleteUser featureList active', (function (err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, data);
    }
  }));
}

userDB.findByAdmin = function (done) {
  User.find({ "role": "user" }, 'firstName lastName email role', (function (err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, data);
    }
  }));
}

userDB.findallAdmins = function (done) {
  User.find({ "role": "admin" }, (function (err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, { success: true, "data": data });
    }
  }));
}

userDB.findallUserEmails = function (done) {
  User.find({ "role": { '$ne': "super_admin" } }, 'email', (function (err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, { success: true, "data": data });
    }
  }));
}

userDB.createUser = function (userData, done) {
  User.findOne({ "email": userData.email }, function (err, data) {
    if (err) {
      return done(err);
    } else if (data) {
      return done(null, messages.errors.user_exists);
    }
    userData.temporaryToken = jwt.sign({ username: userData.username, email: userData.email }, 'jiyawebsite', { expiresIn: '24h' });
    userData.isNewUser = true;
    userData.role = "admin";
    userData.save().then(() => {
      mailer.accountCreationMail(userData.email, userData.original_password, userData.temporaryToken, function (err, data) {
        if (err) { return done(err); }
        else {
          return done(null, messages.success.user_created);
        }
      });
    })
      .catch((err) => {
        return done(null, messages.errors.required_missing);
      });
  });
};

userDB.disable = function (id, done) {
  User.findOneAndUpdate({ "_id": id }, { $set: { active: false } }, function (err, data) {
    if (err) { return done(err); }
    else {
      return done(null, { success: true, "message": "User disabled" });
    }
  })
}

userDB.enable = function (id, done) {
  User.findOneAndUpdate({ "_id": id }, { $set: { active: true } }, function (err, data) {
    if (err) { return done(err); }
    else {
      return done(null, { success: true, "message": "User disabled" });
    }
  })
}



module.exports = userDB;