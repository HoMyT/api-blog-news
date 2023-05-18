const mysql = require('mysql2');

const mysqlConnect = mysql.createConnection(
    {
        host:'localhost',
        user: 'root', 
        database: 'blog_news', 
        password: '753159852456'
    }
);

mysqlConnect.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected')
    }
})

module.exports = mysqlConnect;