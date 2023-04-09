const db = require("../db/models");
const helperUtil = require('../helpers/utils');
const _ = require('lodash');

module.exports = {
    registerUser: function (req, resolve) {
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
    loginUser: function (req, resolve) {
        const token = req.cookies.auth,
            password = req.body.password,
            email = req.body.email;
        db.User.findByToken(token, db.User)
            .then((user) => {
                if (user) {
                    resolve(null, { message: 'You are logged in!' }, 400, 'success');
                } else {
                    db.User.findOne({
                        where: {
                            email: email
                        }
                    })
                    .then((user1) => {
                        if (!user1) {
                            resolve({ message: 'Email Not Found!' }, null, 400, 'success');
                        } else {
                            db.User.comparePassword(password, user1.password)
                                .then((isMatch) => {
                                    if (!isMatch) {
                                        resolve(null, { message: 'Password doesn\'t match!' }, 201, 'success');
                                    } else {
                                        db.User.generateToken(user1)
                                            .then((generatedToken) => {
                                                db.User.update({token: generatedToken}, {
                                                    where: {
                                                        user_id: user1.user_id
                                                    }
                                                })
                                                    .then(() => {
                                                        resolve(null, { email: user1.email, user_id: user1.user_id }, 200, 'success', { auth: token });
                                                    })
                                                
                                            })
                                    }
                                });
                        }
                        
                    })
                    
                }
            })
            .catch(err => {
                console.log('====err : ',err);
                resolve(err, null, 500, 'fail');
            })
    },
    logoutUser: function (req, resolve) {
        const token = req.cookies.auth;
        db.User.deleteToken(token, db.User)
            .then(() => {
                resolve(null, { message: 'Logged out successfully' }, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
}