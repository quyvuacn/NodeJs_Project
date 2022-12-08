const { response } = require("express")
const db = require("../../models")


class CartController {
    async index(req, res){
        let data = {
            title : 'Cart',
            notification : req.session?.notification
        }
        delete req.session?.notification

        res.render('front/cart/index',data)  
    }

    async addOne(req,res){
        let product_id = Number(req.params.product_id)
        let product = await db.Product.findByPk(product_id,{
            include : [{
                model : db.ProductImage,
                as : 'productImages'
            }]
        })        
        product.qty = 1
        if(req.session.cart){
            let checkProduct =  req.session.cart.find(el=>el.id == product_id)
            checkProduct ? checkProduct.qty++ : req.session.cart.push(data)
        }else{
            req.session.cart = [product]
        }
        res.redirect('/cart')
    }

    update(req,res){
        try{
            let product_id = Number(req.body.product_id)
            let qty = Number(req.body.qty)
            let cart = req.session.cart
            cart.find(el=>el.id==product_id).qty = qty
            res.send({
                total : totalCart(cart)
            })
        }catch{
            res.sendStatus(500)
        }
    }

    destroy(req,res){
        try{
            let product_id = Number(req.body.product_id)
            let cart = req.session.cart.filter(el=>el.id!=product_id)
            cart = cart.filter(el=>el.id!=product_id)
            req.session.cart = cart
            res.send({
                count : cart.length,
                total : totalCart(cart)
            })
        }catch(error){
            console.log(error)
            response.sendStatus(500)
        }
       

    }

    async store(req,res){
        let product_id = req.body.product_id
        let qty = req.body.qty      
        let product = await db.Product.findByPk(product_id,{
            include : [{
                model : db.ProductImage,
                as : 'productImages'
            }]
        })        
        product.qty = qty
        if(req.session.cart){
            let checkProduct =  req.session.cart.find(el=>el.id == product_id)
            checkProduct ? '' : req.session.cart.push(data)
        }else{
            req.session.cart = [product]
        }
        res.redirect('/cart')
    }
}

function totalCart(cart) {
    let total = 0
    cart?.forEach(product=>{
        total += product.qty*(product.discount || product.price)
    })
    return total
}


module.exports = new CartController