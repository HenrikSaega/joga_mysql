const db = require('../utils/db');

const getAllArticles = (req, res) => {
    let sql = 'SELECT * FROM article';
    db.query(sql, (error, result) => {
        res.render('index', {
            articles: result
        })
    })
}

const getArticleSlug = (req, res) =>{
    let sql=`SELECT * FROM article WHERE slug="${req.params.slug}"`
    db.query(sql, (error, result) => {
        const article = result[0]
        const author_id = result[0].author_id
        let sql = `SELECT * FROM author WHERE id="${author_id}"`
        db.query(sql, (error, result) => {
            const author= result[0]
            article['author_name'] = author.name
            console.log(result)
            res.render('article', {
                article: article
            })
        })
    })
}

module.exports = {
    getAllArticles,
    getArticleSlug
};