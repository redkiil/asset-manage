const path = require('path');
var rsrc = {
    calendar: {
        'kj8n3SMJMy': 'calendario/calendario.js',
        'Qgz0uwgiu4': 'calendario/calendario.css'
    }, frente: {
        'vaXfocSU0R': 'frente/frente.js',
        'BtNWxJ0hfD':  'frente/frente.css'
    }, registeruser: {
        'vzX3ocip31': 'registeruser/registeruser.js',
    }, registervehicle:{
        'ioXoasUUAz': 'registervehicle/file.js',
    },home:{
        'p3Oriz1koj': 'home/home.js',
        'p4aZuisOPk': 'home/home.css'
    },auth:{
        'asih123iza': 'auth/changepass.js',
        'jp2zzzj22a': 'auth/changepass.css',
        'supjhz221z': 'auth/login.css',
        'ibuyedgado': 'auth/login.js',
    },defines:{
        'jpm97lkzLL': 'defines.js',
    }
}
module.exports = (req, res) => {
    if(!req.params.rsrc)
        return res.status(404).send("resource invalid");
    let rsrc_file = findByKey(rsrc, req.params.rsrc);
    if(!rsrc_file)
        return res.status(404).send("resource not found");

    res.sendFile(rsrc_file, { root: path.join(__dirname, '../assets') });
};
function findByKey(obj, key){
    var result;
    for (var property in obj){
        if (obj.hasOwnProperty(property)){
            if (typeof obj[property] === "object"){
                result = findByKey(obj[property], key);
                if (typeof result !== "undefined"){
                    return result;
                }
            }
            else if (property === key){
                return obj[key];
            }
        }   
    }
}