const { Op } = require("sequelize")
const db = require("../../models")
const Controller = require("../Controller")

class ShopController extends Controller{
    async index(req,res){
        try{
            let data = {
                title : 'Shop'
            }
            data.products = await filter(req)
            res.render('front/shop/index',data)
        }catch(error){
            console.log(error)
            res.send(error)
        }
        
    }

    async category(req,res){
        let category_name = req.params.category
        let category = (await db.Category.findOne({where: { name : category_name}})).id
        req.query.category = category
        
        let data = {
            title : category_name
        }
        data.products =await filter(req)
        res.render('front/shop/index',data)
    }

    async show(req,res){       
        let data = {}
        let productID = req.params.id
        try{
            data.req = req.params
            data.product = await db.Product.findByPk(productID,{
                include : [
                    {model : db.Category,as : 'category'},
                    {model : db.Brand,as : 'brand'},
                    {model : db.ProductImage,as : 'productImages'},
                    {model : db.ProductDetail,as : 'productDetails'}
                ]
            })
            data.title = data.product.name
            data.productComments = await db.ProductComment.findAll({
                include: [{model : db.User, as : 'user'}],
                where : {
                    product_id : productID
                }
            })
            let sumRating = data.productComments.map(el=>el.rating).reduce((p,n)=>p+n,0)
            sumRating > 0 ? data.avgRating = sumRating/data.productComments.length : data.avgRating = 0
            data.relativeProducts = await db.Product.findAll({
                include : [
                    {model : db.Category,as : 'category'},
                    {model : db.Brand,as : 'brand'},
                    {model : db.ProductImage,as : 'productImages'},
                    {model : db.ProductDetail,as : 'productDetails'}
                ],
                where : {
                    product_category_id : data.product.product_category_id
                },
                limit : 4
            })
            
            res.render('front/shop/show',data)

        }catch(error){
            console.log(error)
        }
        
    }

    async postComment(req, res){
        let user = req.session.user
        let data = {
            ...req.body,
            product_id : Number(req.params.id),
            user_id : user.id,
            name : user.name,
            email : user.email
        }
        try{
            await db.ProductComment.create(data)
            res.redirect(`/shop/product/${Number(req.params.id)}`)
        }catch{
            res.send('err')
        }
        
    }

}
async function filter(req){
    let where = {}
    let orderBy = []
    let search = req.query.search?.trim()
    let price_min = Number(req.query.price_min?.replace('$','') || 0) 
    let price_max = Number(req.query.price_max?.replace('$','') || 100) 
    let brand_id =  Number(req.query.brand || 0)
    let sort_by = req.query.sort_by
    let category_id =  Number(req.query.category)
    where.price = {
        [Op.between]: [price_min, price_max]
    }
    search ? where.name = {
        [Op.like] : `%${search}%`
    } : ''

    brand_id ? where.brand_id = brand_id : ''

    category_id ? where.product_category_id = category_id : ''

    switch (sort_by){
        case 'name-asc':
            orderBy.push(['name', 'ASC'])
            break;
        case 'name-dsc':
            orderBy.push(['name', 'DESC'])
            break;
        case 'price-asc':
            orderBy.push(['discount', 'ASC'])
            break;
        case 'price-dsc':
            orderBy.push(['discount', 'DESC'])
            break;
        default :
            
    }

    let products = await db.Product.findAll({
        include : [
            {
                model : db.ProductDetail,
                as : 'productDetails'
            },
            {
                model : db.ProductImage,as : 'productImages'
            },
            {
                model : db.Brand,as : 'brand'
            }
        ],
        where : {...where},
        // offset : offset,
        // limit : limit,
        order : [...orderBy]
    }) 
    //Phân trang
    products = ShopController.pagination(req,products)
    return products
}

module.exports = new ShopController