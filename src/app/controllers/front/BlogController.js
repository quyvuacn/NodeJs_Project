class BlogController {
    async index(req, res){
        let data = {
            title : 'Blog'
        }
        res.render('front/blog/index',data)
    }

    async show(req, res){
        let data = {
            title : 'Blog'
        }
        res.render('front/blog/show',data)
    }
}

module.exports = new BlogController