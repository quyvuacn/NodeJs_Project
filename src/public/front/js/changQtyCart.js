$(document).ready(function(){
    $('.pro-qty').click(function(e){
        let el_qty = $(this).find('.qty')
        let qty = el_qty.val()
        let product_id = $(this).find('.product_id').val()
        let tr = $(this).parents('tr').find('.total-price')
        let price = $(this).find('.product_price').val()

        if(e.target.closest('.dec')){
            if(qty>=1){
                update(product_id,qty,tr,price)
            }else{
                del(product_id,el_qty)
                el_qty.val(1)
            }
        }
        if(e.target.closest('.inc')){
            update(product_id,qty,tr,price)
        }
    })


    $('.close-td').click(function(){
        let product_id = $(this).parents('tr').find('.product_id').val()
        let el_qty = $(this).parents('tr').find('.qty')
        del(product_id,el_qty)
    })
})

async function update(product_id,qty,tr,price){
    try{
        let res = await fetch('./cart/update',{
            method : 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                product_id : product_id,
                qty : qty
            })
        })
        let {total} = await res.json()
        let row_total = Number(price)*Number(qty.trim())
        $('.cart-total span').html(`$${total}`)
        tr.find('.total-price').prevObject.html(`$${row_total}`)
    }catch(error){
        console.log(error)
        alert('Updated failed')
    }
        
}

async function del(product_id,el_qty){
    let confirmDel = confirm('Are you sure you want to delete')
    if(confirmDel){
        try{
            let res = await fetch('./cart/delete',{
                method : 'DELETE',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    product_id : product_id
                })
            })
            let {count,total} = await res.json()

            $('.cart-total span').html(`$${total}`)

            el_qty.parents('tr').remove()
        }catch(error){
            console.log(error)
            alert('Delete failed')
        }
    }
}