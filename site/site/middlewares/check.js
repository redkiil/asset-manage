const axios = require('axios');
module.exports = (req, res, next) => axios.get('http://localhost:3000/auth/validateuser', { withCredentials: true, headers: { cookie: req.headers.cookie }})
.then(function(response){
    next();
}).catch(function(e){
    return res.redirect("http://localhost:3001/login");
});