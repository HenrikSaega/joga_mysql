const ArticleModel = require("../../models/article");
const ArticleController = require("../article");
const articleModel = new ArticleModel();

module.exports = class ArticleAdminController extends ArticleController {

  async createNewArticle(req, res) {
    const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
    }
    const articleId = await articleModel.create(newArticle);
    res.status(201).json({
                message: `Created article with ID ${articleId}`,
                article: {id: articleId, ...newArticle}
    })
  }

  async updateArticle(req, res) {
        const id = req.params.id;
        const findArticle = await articleModel.findById(id);
        if (!findArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        
        const article = await articleModel.update(findArticle.id, req.body);
        console.log(article);

        try {
            res.status(200).json({
                message: `Updated article: ${req.params.slug}`,
                article: {id: findArticle.id, ...req.body}
            })
        } catch (error) {
            res.status(500).json({message: "Error updating article:", error});
        }
    }

  async deleteArticle(req, res) {
      const article = await articleModel.delete(req.params.id);
      res.status(201).json({message: `Deleted article with ID ${req.params.id}`});
  }
}