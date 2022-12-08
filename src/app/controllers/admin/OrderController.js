const { response } = require("express");
const { Op } = require("sequelize");
const db = require("../../models");
const Constant = require("../../utilities/Constant");
const Controller = require("../Controller");

class OrderController extends Controller {
    async index(req, res) {
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        let search = req.query.search || ''
        delete req.session.notification

        try{
            data.orders = await db.Order.findAll({
                include : [
                    {
                        model : db.OrderDetail,
                        as : 'orderDetails',
                        required: false, 
                        include : {
                            model : db.Product,
                            as : 'product',
                            include : {
                                model : db.ProductImage,
                                as : 'productImages',
                            } 
                        }
                    }
                ],
                where : {
                    [Op.or] : [
                        {email : {[Op.like] : `%${search}%`}},
                        {first_name : {[Op.like] : `%${search}%`}},
                        {last_name : {[Op.like] : `%${search}%`}},
                        {company_name : {[Op.like] : `%${search}%`}},
                        {'$orderDetails->product.name$' : {[Op.like] : `%${search}%`}}

                    ]
                }
            })
            data.orders = OrderController.pagination(req,data.orders)
            data.status = Constant.ORDER_STATUS
            
            res.render('admin/order/index',data)
        }
        catch(error){
            console.log(error)
        }

    }
    async show(req, res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        delete req.session.notification

        try{
            let orderId = req.params.orderId
            data.order = await db.Order.findByPk(orderId)
            data.orderDetails = await db.OrderDetail.findAll({
                include : [
                    {
                        model : db.Product,
                        as : 'product',
                        include : {
                            model : db.ProductImage,
                            as : 'productImages'
                        }
                    },
                    {
                        model : db.Order,
                        as : 'order'
                    }
                ],
                where : {
                    order_id : orderId
                }
            })
            data.payment_type = Constant.PAYMENT_TYPE
            data.status = Constant.ORDER_STATUS
            res.render('admin/order/show',data)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = new OrderController