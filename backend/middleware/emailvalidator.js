const validator = require('validator');

module.exports=(req,res,next)=>{
    const email= req.body.email
    if(validator.isEmail(email)===true){
        next()
    } else {
        res.status(400).json( { error: `l'email ${email} n'est pas valide`})
    }
}