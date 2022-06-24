const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
      },

      // get one user by id
      getUserById({ params }, res) {
        User.findOne({ _id: params.id})
            .populate({
                path
            })
      }
    }
