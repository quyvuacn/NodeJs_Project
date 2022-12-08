class Controller{ 
    static pagination(req,data){
        let page = req.query?.page || 1
        let limit = req.query?.limit || 3
        
        let items = data.length
        let maxPages = Number((items/limit).toFixed())
        if(page>maxPages){
            req.query.page = maxPages
            page = maxPages
        }
        if(page<1){
            req.query.page = 1
            page = 1
        }
        
        data = data.filter((el,index)=>{
            return index >= limit*(page-1) && index < limit*page 
        })
        data.count = items //count trả về số item
        data.pages = maxPages
        return data
    }
}

module.exports = Controller