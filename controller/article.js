const { v4: uuidv4 } = require('uuid');
const mysqlConnect = require('../middelware/mysql');

exports.createArticle = (req, res, next) => {
    const { article, categorie } = req.body;
    const objArticle = {
        uuid: mysqlConnect.escape(uuidv4()),
        uuid_user: mysqlConnect.escape(req.auth.userId),
        article: mysqlConnect.escape(article),
        categorie: mysqlConnect.escape(categorie)
    }
    $Sql = `INSERT INTO article(uuid, uuid_user, article, categorie) VALUES(${objArticle.uuid}, ${objArticle.uuid_user}, ${objArticle.article}, ${objArticle.categorie})`;

    mysqlConnect.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        else {
            return res.status(201).json({ message: "Your article has been created successfully!" })
        }
    })
}

exports.getAllArticle = (req, res, next) => {
    $Sql = "SELECT a.categorie, a.article, c.uuid, c.name AS categorieArticle, u.uuid, u.name, u.last_name FROM article a, categorie c, user u WHERE a.categorie = c.uuid AND u.uuid = a.uuid_user";
    mysqlConnect.query($Sql, (err, result, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        else { return res.status(201).json(result) }
    })
}