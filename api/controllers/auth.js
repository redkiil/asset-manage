const mongoose = require('mongoose');
const User = require("../models/users");
const jwt = require('jsonwebtoken');
const authConfig = require('../auth.json');


exports.post = async(req, res) =>{

    const { registration , password } = req.body;
    
    const usr = await User.findOne({ registration: registration });
    
    if(usr && (password === "oi")){
        const token = jwt.sign({ user: usr.id}, authConfig.secret, {
            expiresIn: 86400
        });
        let cu = `Bearer ${token}`;
        res.cookie('usrtoken',cu, { maxAge: 864000000, httpOnly: true});
        return res.status(200).send({ msg: "logado com sucesso"});
    }
    res.status(400).send({ msg: "matricula e/ou senha incorretos"});
};

exports.get = (req, res) => {
    res.clearCookie('usrtoken');
    return res.status(200).send({ msg: "OK"});
};
exports.validateData = (req, res, next) =>{
    const { registration , password } = req.body;
    if(!registration)
        return  res.status(400).send({ msg: "campo matricula bazio"});
    let regexp = /^[0-9]{4}$/;
    let okregistration = regexp.test(registration);
    if(!okregistration)
        return  res.status(400).send({ msg: "formato matricula invalido"});
    if(!password)
        return  res.status(400).send({ msg: "campo senha vazio"});
    return next();
};
exports.validateuser = async(req, res) => {
    const usr = await User.findOne({ _id: req.userid }, "registration");
    return res.status(200).send({ registration: usr.registration });
};