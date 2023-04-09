const db = require("../db/models");
const helperUtil = require('../helpers/utils');
const _ = require('lodash');

module.exports = {
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