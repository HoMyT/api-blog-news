const xss = require('xss');

const cleanInput = (req, res, next) => {
    const body = req.body;
    for (const key in body) {
        if (body.hasOwnProperty(key)) {
            body[key] = xss(body[key]);
        }
    }
    next();
};

module.exports = cleanInput;