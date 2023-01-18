
import mongoose from 'mongoose'
import config from '../utils/config.js'
import {User} from "../persistence/models/UserModel.js"

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

export const registro = async (email, password, req, res) => {
    const userFound = await User.findOne({ email: email })
    if (userFound || email == undefined || email == '') {
        return res.redirect("/api/error-registro")
    }
    const newUser = new User({ email, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    return res.redirect("/api/login")
}

export const desloguear = async (idSession, req, res) =>{
    let userInfo = await User.findOne({ '_id': idSession })
    let infoUser = userInfo.email
    await req.logout((err) => {
        if (err) return next(err)
        return res.render("logout", { infoUser })
    })
}

export const userInfo =  async (req, res) =>{
    let userInfo = await User.find()
    return userInfo;
}