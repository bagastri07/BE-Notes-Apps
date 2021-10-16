const response = require('../_helpers/response')
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        return response(res, 400, false, 'You need to login!');
    }
}

module.exports = isAuthenticated;