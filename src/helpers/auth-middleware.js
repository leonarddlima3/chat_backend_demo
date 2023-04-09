const db = require('../db/models');

const auth = (req, res, next) => {
    let token =req.cookies.auth;

    return db.User.findByToken(token, db.User)
        .then((user) => {
            if (!user) {
                throw err;
            } else {
                req.token = token;
                req.user = user;
                next();
            }
        })
        .catch((err) => {
            res.json({
                error :true,
                message: 'Authentication failed!'
            });
        });
}

module.exports = auth;