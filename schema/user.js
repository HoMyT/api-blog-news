const Joi = require('joi');


const inscriptionUser = Joi.object({
    email: Joi.string().email().max(150).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(80).required(),
    last_name: Joi.string().max(80).required(),
});

const valideUser = (req, res, next) => {
    const { error } = inscriptionUser.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}

module.exports = valideUser;
