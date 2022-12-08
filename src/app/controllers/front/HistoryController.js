const db = require("../../models")

class HistoryController {
    async index(req, res) {
        let data = {
            title : 'History'
        }
        try{
            let user_id = req.session.user.id
            data.orders = await db.Order.findAll({
                include : [
                    {
                        model : db.OrderDetail,
                        as: 'orderDetails',
                        include : {model : db.Product , as : 'product',include: {model : db.ProductImage, as : 'productImages'}}
                        
                    }
                ],
                where : {
                    user_id : user_id,
                }
            })
            // res.send(data.orders)
            res.render('front/history',data)

        } catch(error){
            res.send(error)
        } 

    }
}


module.exports = new HistoryController

