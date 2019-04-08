const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//load keys
const keys = require("../config/dev").SECRECT;

//load Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.auth = (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).send({
      errors: [
        {
          title: errors,
          detail: errors
        }
      ]
    });
  }
  User.findOne({ email }, function(err, user) {
    if (err) {
      return res.status(422).send({
        errors: [
          {
            title: err,
            detail: err
          }
        ]
      });
    }
    if (!user) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid User",
            detail: "User does not exist"
          }
        ]
      });
    }
    // bcrypt.compare(req.body.Password, user.password, function(err, res) {
    //   if (res == true) {
    //     const payload = {
    //       userId: user.id,
    //       username: user.username
    //     };
    //     jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
    //       res.json({
    //         success: true,
    //         token: "Bearer " + token
    //       });
    //     });
    //   }
    //   if (res == false) {
    //     return res.status(422).send({
    //       errors: [
    //         {
    //           title: "Wrong data",
    //           detail: "Password Incorrect"
    //         }
    //       ]
    //     });
    //   }
    // });

    if (user.hasSamePassword(password)) {
      const payload = {
        userId: user.id,
        username: user.username
      };
      jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      return res.status(422).send({
        errors: [
          {
            title: "Wrong data",
            detail: "Password Incorrect"
          }
        ]
      });
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password, password2 } = req.body;
  //   if (!password || !email) {
  //     res.status(422).send({
  //       errors: [
  //         { title: "Data missing", detail: "Please provide email and password" }
  //       ]
  //     });
  //   }
  //   if (password !== password2) {
  //     res.status(422).send({
  //       errors: [
  //         {
  //           title: "Invalid Passwrd",
  //           detail: "Password and confirmation password didnot match"
  //         }
  //       ]
  //     });
  //   }
  //   res.json({ username, email });

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).send({
      errors: [
        {
          title: errors,
          detail: errors
        }
      ]
    });
  }

  //   User.findOne({
  //     email
  //   }).then(user => {
  //     if (user) {
  //       return res.status(400).send({
  //         errors: [
  //           {
  //             title: "existing user",
  //             details: "This email already exists"
  //           }
  //         ]
  //       });
  //     }
  //   });
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(400).send({ mongoose: "mongoose error" });
    }
    if (user) {
      return res.status(400).send({
        errors: [
          {
            title: "existing user",
            details: "This email already exists"
          }
        ]
      });
    }
    const newUser = new User({
      username,
      email,
      password
    });
    newUser
      .save()
      .then(user => res.json({ message: true }))
      .catch(err => console.log(err));
  });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, (err, user) => {
      if (err) {
        return res.status(422).send({
          errors: [
            {
              title: "Not Found",
              detail: "user Not found"
            }
          ]
        });
      }
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};
function parseToken(token) {
  return jwt.verify(token.split(" ")[1], keys);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: "Not Authorized",
        detail: "You need to login to access"
      }
    ]
  });
}
