const { Op } = require("sequelize")
const db = require("../../models")
const Constant = require("../../utilities/Constant")
const uploadFiles = require("../../utilities/UploadFile")
const Controller = require("../Controller")

class ProductController extends Controller {
    async index(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        let search = req.query.search || ''

        delete req.session.notification

        try{
            data.products = await db.Product.findAll({
                include : [
                    {
                        model : db.ProductDetail , as : 'productDetails'
                    },
                    {
                        model : db.ProductImage, as : 'productImages'
                    }
                ],
                where :{
                    [Op.or] : [
                        {name : {[Op.like] : `%${search}%`}},
                        {tag : {[Op.like] : `%${search}%`}}
                    ]
                }                
            })

            data.products = ProductController.pagination(req,data.products)

        }catch(error){
            console.log(error)
        }


        res.render('admin/product/index',data)
    }

    async show(req, res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            let id = req.params.productId
            data.product = await db.Product.findByPk(id,{
                include : [
                    {
                        model : db.ProductImage , as : 'productImages'
                    },
                    {
                       model : db.ProductDetail , as : 'productDetails' 
                    },
                    {
                        model : db.Brand , as : 'brand' 
                     },
                     {
                        model : db.Category , as : 'category' 
                     }
                ]
            })
        }
        catch(error){

        }
        res.render('admin/product/show', data)

    }

    async create(req, res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            data.brands = await db.Brand.findAll()
            data.categories = await db.Category.findAll()
            res.render('admin/product/create',data)
        }catch{

        }
    }

    async store(req,res){
        try{
            let data = req.body
            let product = await db.Product.create(data)
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Tạo sản phẩm thành công'
            } 
            res.redirect(`/admin/product/${product.id}`)
        }catch(error){
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Tạo sản phẩm thất bại'
            } 
            res.redirect('/admin/product')
        }   
        
    }

    async destroy(req, res){
        try{
            let productId = req.body.id
            let product = await db.Product.findByPk(productId)
            await product.destroy()
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Xóa sản phẩm thành công'
            }
            res.redirect('/admin/product')
        }catch(error){
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Xóa sản phẩm thất bại'
            }
            res.redirect('/admin/product')
        }
    }

    async edit(req,res){
        let data = {
            title : 'Product Image',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            let productId = req.params.productId
            data.product = await db.Product.findByPk(productId)
            data.brands = await db.Brand.findAll()
            data.categories = await db.Category.findAll()
            res.render('admin/product/edit',data)
        }catch(error){
            console.log(error)
        }
    }

    async update(req,res){
        try{
            let data = req.body
            let productId = req.body.id
            let product = await db.Product.findByPk(productId)
            await product.update(data)
            res.redirect(`/admin/product/${product.id}`)
        }catch(error){
            console.log(error)
        }
    }

    async showImage(req, res){
        let data = {
            title : 'Product Image',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            let id = req.params.productId
            data.product = await db.Product.findByPk(id,{
                include : [{
                    model : db.ProductImage,as: 'productImages'
                }]
            })
        }
        catch(error){

        }
        res.render('admin/product/showImage', data)

    }
    async destroyImage(req,res){
        let data = {
            title : 'Product Image',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            let id = req.body.id
            let image = await db.ProductImage.findByPk(id)
            await image.destroy()
            res.redirect(`image`)
        }
        catch(error){

        }

    }

    async storeImage(req,res){
        try{
            
            let id = req.body.product_id
            let files = req.files.image
            if(files){
                let newFileName = uploadFiles(files,'front/img/products')
                await db.ProductImage.create({
                    product_id : id,
                    path : newFileName
                })
            } 
            res.redirect(`/admin/product/${id}/image`)
        }
        catch(error){
            console.log(error)
        }
        
    }

    async indexDetail(req,res){
        let data = {
            title : 'Product Image',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        let search = req.query.search || ''
        delete req.session.notification

        try{
            let productId = req.params.productId
            data.productDetails = await db.ProductDetail.findAll({
                where :{
                    product_id : productId,
                    [Op.or] : [
                        {color : {[Op.like] : `%${search}%`}},
                        {size : {[Op.like] : `%${search}%`}},
                    ]
                }
            })
            data.product = await db.Product.findByPk(productId)
        }catch(error){
            console.log(error)
        }
        res.render('admin/product/detail/index',data)
    }
    async editDetail(req,res){
        let data = {
            title : 'Product Image',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            let productId = req.params.productId
            let detailId = req.params.detailId
            data.product = await db.Product.findByPk(productId,{
                include:[{
                    model : db.ProductDetail,
                    as : 'productDetails',
                    where : {
                        id : detailId
                    }
                }]
            })
        }catch(error){
            console.log(error)
        }
        res.render('admin/product/detail/edit',data)
    }

    async updateDetail(req,res){
        let detailId = req.body.id
        let productId = req.params.productId
        try{
            let productDetail = await db.ProductDetail.findOne({
                where : {
                    product_id : productId,
                    id : detailId
                }
            })
            await productDetail.update(req.body)
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Update thành công'
            } 
        }catch{
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Update thất bại'
            } 
        }
        res.redirect(`detail`)
    }

    async destroyDetail(req,res){
        let detailId = req.body.id
        let productId = req.params.productId
        try{
           let productDetail = await db.ProductDetail.findByPk(detailId,{
            where : {
                product_id : productId
            }
           })
           await productDetail.destroy()
           req.session.notification = {
            tata : Constant.TATA['success'],
            message : 'Xóa thành công'
            } 
        }catch{
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Xóa thất bại'
                }  
        }
        res.redirect(`detail`)
    }

    async createDetail(req,res){
        let data = {
            title : 'Product Image',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification
        try{
            let productId = req.params.productId
            data.product = await db.Product.findByPk(productId)
            res.render('admin/product/detail/create', data)
        }catch(error){
            console.log(error)
        }

    }
    async storeDetail(req,res){
        let productId = req.params.productId
        try{
            let data = {
                ...req.body,
                product_id : productId
            }
            await db.ProductDetail.create(data)
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Tạo thành công'
            } 
        }catch{
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Tạo thất bại'
            } 
        }
        res.redirect(`detail`)
    }   
}


module.exports = new ProductController