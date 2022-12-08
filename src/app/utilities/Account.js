const bcrypt = require('bcrypt')
const saltRounds =Number(process.env.BCRYPT_SALT) || 10

Account  = {
    hashPassword : function (password) {
        return  bcrypt.hashSync(password,saltRounds)
    },
    comparePassword : function (password,hashPassword){
        return bcrypt.compareSync(password,hashPassword)
    }

}  


module.exports = Account