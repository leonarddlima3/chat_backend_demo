const db = require("../db/models");
const helperUtil = require('../helpers/utils');
const _ = require('lodash');

module.exports = {
    registerUser: function (req, resolve) {
        const isAdmin = req.user.is_admin;
        if (!isAdmin) {
            resolve({ message: 'User not Admin!' }, null, 500, 'fail');
            return;
        }
        const userData = _.pick(req.body, [
            'full_name',
            'email',
            'phone_no',
            'password'
        ]);
        userData.user_id = `user_${helperUtil.getUniqueId()}`;
        db.User.findOne({
            where: {
                email: userData.email
            }
        })
            .then((user) => {
                if (user) {
                    resolve({ message: 'User already exists!' }, null, 500, 'fail');
                } else {
                    db.User.create(userData)
                        .then((data) => {
                            resolve(null, data, 201, 'success');
                        })
                        .catch(err => {
                            resolve(err, null, 500, 'fail');
                        });
                }
            });
    },
    getUsers: function(req, resolve) {
        db.User.findAll({})
            .then((data) => {
                resolve(null, data, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    updateUser: function(req, resolve) {
        const userId = req.params.userId;
        const userData = _.pick(req.body, [
            'full_name',
            'email',
            'phone_no',
            'password'
        ]);

        db.User.update(userData, {
            where: {
                user_id: userId
            }
        })
            .then(() => {
                resolve(null, null, 204, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    }
}