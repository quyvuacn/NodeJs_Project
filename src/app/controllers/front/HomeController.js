const db = require("../../models")
class HomeController{
    async index(req,res){
        let data = {
            title : 'Home'
        }

        try{
            data.men = await db.Product.findAll({
                include : [
                        {
                            model : db.ProductImage,
                            as : 'productImages'
                        },
                        {
                            model : db.Brand,as : 'brand'
                        }
                    ],  
                where : {
                    product_category_id : 1
                }
            })
            // console.log(men.length)
    
            data.women = await db.Product.findAll({
                include : [
                    {
                        model : db.ProductImage,
                        as : 'productImages'
                    },
                    {
                        model : db.Brand,as : 'brand'
                    }
                ], 
                where : {
                    product_category_id : 2
                }
            })

            data.blogs = await db.Blog.findAll({
                limit : 3
            })
            res.render('front/home',data)
        }catch(error){
            res.send(error)
        } 
    }   
}

module.exports = new HomeController;