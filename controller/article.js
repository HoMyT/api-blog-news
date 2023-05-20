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
    $Sql = "SELECT a.categorie, a.article, a.uuid AS uuidArticle, c.uuid, c.name AS categorieArticle, u.uuid, u.name, u.last_name FROM article a, categorie c, user u WHERE a.categorie = c.uuid AND u.uuid = a.uuid_user";
    mysqlConnect.query($Sql, (err, result, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        else { return res.status(201).json(result) }
    })
}

exports.OneArticle = (req, res, next) => {
    const uuid = {
        uuid: mysqlConnect.escape(req.params.uuid)
    }

    $Sql = `SELECT * FROM article WHERE uuid = ${uuid.uuid}`;
    mysqlConnect.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        else { 
            if (results.length > 0) {
                return res.status(201).json(results)
            } else {
                return res.status(401).json({ message: "This article does not exist." })
            }
        }
    })
}

exports.updateArticle = (req, res, next) => {
    const uuid = {
        uuid: mysqlConnect.escape(req.params.uuid)
    }
    $Sql = `SELECT * FROM article WHERE uuid = ${uuid.uuid}`;
    mysqlConnect.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        if (results.length > 0) {
            const uuidUserArticle = results.map(results => results.uuid_user);
            if (uuidUserArticle[0] == req.auth.userId) {
                const { article } = req.body;
                const objArticle = { article: mysqlConnect.escape(article) };
                $Sql = `UPDATE article SET article = ${objArticle.article} WHERE uuid = ${uuid.uuid}`;
                mysqlConnect.query($Sql, (err, results, fields) => {
                    if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
                    else {
                        return res.status(201).json({ message: "The article has been successfully modified."})
                    }
                })
            } else {
                return res.status(401).json({ message: "You are not authorized to perform this action." })
            }
        } else {
            return res.status(401).json({ message: "This article does not exist." })
        }
    })
}

exports.deleteArticle = (req, res, next) => {
    const uuid = {
        uuid: mysqlConnect.escape(req.params.uuid)
    }
    $Sql = `SELECT * FROM article WHERE uuid = ${uuid.uuid}`;
    mysqlConnect.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        if (results.length > 0) {
            const uuidUserArticle = results.map(results => results.uuid_user);
            if (uuidUserArticle[0] == req.auth.userId) {
                $Sql = `DELETE FROM article WHERE uuid = ${uuid.uuid}`;
                mysqlConnect.query($Sql, (err, results, fields) => {
                    if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
                    else {
                        return res.status(201).json({ message: "The article has been successfully modified."})
                    }
                })
            } else {
                return res.status(401).json({ message: "You are not authorized to perform this action." })
            }
        } else {
            return res.status(401).json({ message: "This article does not exist." })
        }
    })
}