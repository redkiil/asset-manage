const axios = require('axios');
const config = require('../../config.json');
module.exports = (req, res, next) => axios.get(`${config.API_URL}/auth/validateuser`, { withCredentials: true, headers: { cookie: req.headers.cookie }})
.then(function(response){
    req.useregistration = response.data.registration;
    next();
}).catch(function(e){
    return res.redirect(`${config.BASE_URL}/login`);
});