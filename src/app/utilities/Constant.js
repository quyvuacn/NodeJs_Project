const Constant = {
    USER_LEVEL : {
        not_verifie : 0,
        admin : 1,
        client : 2
    },
    PAYMENT_TYPE : {
        'pay_later' : 'pay_later',
        'vn_pay' : 'vn_pay'
    },
    ORDER_STATUS : {
        'ReceiveOrders' : 1,
        'Unconfirmed' : 2,
        'Confirmed' : 3,
        'Paid' : 4,
        'Processing' : 5,
        'Shipping' : 6,
        'Finish' : 7,
        'Cancel' : 0
    },
    SUBJECT_MAIL : {
        
    }
    ,TATA : {
        text : 'text',
        log : 'log',
        info : 'info',
        success : 'success',
        warn : 'warn',
        error : 'error'
    }
}

module.exports = Constant