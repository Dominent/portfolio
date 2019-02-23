import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import validateRegisterInput from '@server/validation/register';
import validateLoginInput from '@server/validation/login';
import sql from 'mssql';

const router = express.Router();

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;

      return new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
      }).connect()
        .then((pool) => {
          return pool.request()
            .input('Username', sql.NVarChar(100), user.name)
            .input('Password', sql.NVarChar(300), user.password)
            .input('Email', sql.NVarChar(100), user.email)
            .output('Error')
            .execute('prc_CreateUserAccount')
        }).then(result => {
          if (result.output.Error) {
            errors.email = "Email already exists";

            console.log(JSON.parse(result.output.Error))

            res.status(400).json(errors);
          } else {
            res.status(201).json({
              name: user.name,
              email: user.email
            });
          }
        }).catch(err => {
          console.log(err)

          res.status(400).json(err)
        });
    });
  });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  return new sql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  }).connect()
    .then((pool) => {
      return pool.request()
        .input('Email', sql.NVarChar(100), email)
        .execute('prc_GetUserAccount')
    }).then(result => {
      const user = result.recordset[0];
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.Password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.Id,
            name: user.Username,
            email: user.Email
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    }).catch(err => {
      console.log(err)

      res.status(400).send()
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get("/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

export default router;
