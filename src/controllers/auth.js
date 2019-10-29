const mongoose = require('mongoose');
const User = require("../models/users");
const jwt = require('jsonwebtoken');
const authConfig = require('../auth.json');


exports.post = async(req, res) =>{

    const { registration , password } = req.body;
    
    console.log(req.body.registration)

    const usr = await User.findOne({ registration: registration });
    
    if(usr && (password === "oi")){
        const token = jwt.sign({ user: usr.id}, authConfig.secret, {
            expiresIn: 86400
        });
        let cu = `Bearer ${token}`;
        res.cookie('usrtoken', cu, { maxAge: 9999999});
        console.log(req.cookies.usrtoken);
        return res.status(200).send({ msg: "logado com sucesso" });
    }
    res.status(400).send({ msg: "matricula e/ou senha incorretos"});
};

exports.get = (req, res) => {
    res.clearCookie('usrtoken');
    return res.status(200).send({ msg: "OK"});
};