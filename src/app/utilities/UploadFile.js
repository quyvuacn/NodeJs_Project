const config = require('../config/config')
const path = require('path')
const fs = require('fs')
const public = config['public']

function uploadFiles(files,newPath,destroyFileOld = '') {
    if(Array.isArray(files)){
       return files.map(file=>{
            uploadFile(file,newPath,destroyFileOld)
        })
    }else{
        return uploadFile(files,newPath,destroyFileOld)
    }
}


function getExtension(fileName) {
    pos = fileName.lastIndexOf(".")      
    if (fileName === "" || pos < 1) return ""                     
    return '.'+fileName.slice(pos + 1);          
}
function uploadFile(file,newPath,destroyFileOld){
    let fileName = file.name
        let date = new Date().getTime()
        let oldPath = path.join(public,newPath,destroyFileOld)
        let newName = file.md5 + '_' + date + getExtension(fileName)
        newPath = path.join(public,newPath,newName)
        file.mv(newPath,function(err){
            if(err) throw err
            console.log(newName + ' đã được upload')
            if(destroyFileOld){
                fs.unlinkSync(oldPath)
                console.log('Destroy '+ destroyFileOld)
            }
        })
        return newName
}


module.exports = uploadFiles