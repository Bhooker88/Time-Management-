const jwt = require('jsonwebtoken');

const requireRole = role => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).send('You do not have permission to perform this action');
    }
    next();
};

module.exports = { requireRole };