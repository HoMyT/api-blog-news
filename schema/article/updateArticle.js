const Joi = require('joi');


const updateArticle = Joi.object({
    article: Joi.string().required(),
});

const ArticleValide = (req, res, next) => {
    const { error } = updateArticle.validate(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }); }
    else { next(); }
}

module.exports = ArticleValide;
