const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsername = (req, res, next) => {
  console.log('CHECK USERNAME')
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    console.log(user)
    if (user) {
      console.log('2 ' + user)
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }  
    
    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  console.log('CHECK ROLES')
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;