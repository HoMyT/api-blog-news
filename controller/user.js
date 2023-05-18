const mysqlConnect = require('../middelware/mysql');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

exports.inscriptionUser = (req, res, next) => {
    const { email, password, name, last_name } = req.body;
    const user = {
        uuid: mysqlConnect.escape(uuidv4()),
        email : mysqlConnect.escape(email),
        password: mysqlConnect.escape(password),
        name : mysqlConnect.escape(name),
        last_name: mysqlConnect.escape(last_name)
    }

            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) { return res.status(401).json({ message: `An error has occurred :${error}` }) }
                else { 
                    $Sql = `INSERT INTO user(uuid, email, password, name, last_name) VALUES (${user.uuid}, ${user.email}, ${JSON.stringify(hash)}, ${user.name}, ${user.last_name})`;
                    mysqlConnect.query( $Sql, (err, results, fields) => {
                        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
                        else { return res.status(201).json({ message: "User adds successfully" }) }
                    })
                }
            })
}

exports.connexionUser = (req, res, next) => {
    const  { email, password } = req.body;
    const user = {
        email: mysqlConnect.escape(email),
        password: mysqlConnect.escape(password)
    };

    $Sql = `SELECT * FROM user WHERE email = ${user.email}`;
    mysqlConnect.query($Sql, (err, results, fields) => {
        if (err) { return res.status(401).json({ message: `An error has occurred :${err}` }) }
        else {
            if (results.length > 0) {
                resultPassword = results.map(results => results.password);
                bcrypt.compare(user.password, resultPassword[0], (err, resultsBcrypt) => {
                    if (err) { return res.status(401).json({ message: `An error occurred while verifying your password, please try again: ${err}`}) }
                    if (!resultsBcrypt) { res.status(401).json({ message: "Your password is not valid!" }) }
                    else {
                        const uuidUser = results.map(results => results.uuid);
                        return res.status(201).json({
                            message: 'You are connected!',
                            token: jwt.sign({ uuid: uuidUser}, "MY_SECRET_TOKEN", {expiresIn: "4h"}),
                        })
                    }
                })
            } else {
                return res.status(401).json({ message: 'unkonw user' })
            }
        }
    })
}