const db = require("../models")
const Constant = require("../utilities/Constant")
const Mail = require("../utilities/Mail")

class Payment {

    async payLater(req,res){
        try{
            let cart = req.session.cart
            let user = req.session.user
            let data = {
                user_id : user.id,
                ...req.body,
                status : Constant.ORDER_STATUS['Processing'],
                total : totalCart(cart)
            }
            let newOrder = await db.Order.create(data)
            let orderId = newOrder.id
            let listOrderDetail = []      
            cart.forEach(product => {
                listOrderDetail.push({
                    order_id : orderId,
                    product_id : product.id,
                    qty : product.qty
                })
            })
            await db.OrderDetail.bulkCreate(listOrderDetail) 
            req.session.notification = 'You have placed an order successfully. We have sent a confirmation email about the order details.'
            //Send Mail
            let infoMail = {
                viewEjs : 'thank_you',
                toEmail : newOrder.email,
                subject : "Order Notification",
                dataMail : {
                    order: newOrder,
                    orderDetails : cart,
                    total : totalCart(cart)
                },
                attachments : ['front/img/logo.png']
            }
            await Mail.sendMail(infoMail)
            res.redirect('checkout/result/done')

        }catch(error){
            console.log(error)
            res.redirect('checkout/result/failed')
        }
    }

    async vnPay(req,res){
        res.send('Phương thức chưa được tích hợp')
    }

}


function totalCart(cart) {
    let total = 0
    cart?.forEach(product=>{
        total += product.qty*(product.discount || product.price)
    })
    return total
}


module.exports = new Payment