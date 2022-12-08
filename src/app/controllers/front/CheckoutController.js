const Constant = require("../../utilities/Constant")

const Payment = require("../../utilities/Payment")


class CheckoutController {
    index(req,res){
        let data = {
            title : 'Check Out',
        }
        if(!req.session.cart){
            req.session.notification = 'Please add products to cart to checkout!'
            res.redirect('/cart')
        }else{
            res.render('front/cart/check-out',data)
        }
    }

    async newOrder(req,res){
        let payment_type = req.body.payment_type

        if(payment_type==Constant.PAYMENT_TYPE['pay_later']){
            await Payment.payLater(req,res)
        }

        if(payment_type==Constant.PAYMENT_TYPE['vn_pay']){
            await Payment.vnPay(req,res)
        }
    }

    resultDone(req,res){
        if(req.session.notification){
            let data = {
                title : 'Thank You!',
                notification : req.session.notification
            }
            delete req.session.notification
            res.render('front/cart/result-done',data)
        }else{
            res.redirect('/')
        }
        
    }

    vnPayCheck(req,res){
        res.send(req.query)
    }
}



module.exports = new CheckoutController