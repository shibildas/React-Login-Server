const express = require('express')
const router = express.Router()
const adminController = require("../controller/adminController")
const userAuth = require('../middlewares/userAuth')

router.post('/', adminController.adminLogin)
router.get('/isAdminAuth',userAuth.adminJwt,adminController.isAdminAuth)
router.get('/getUsers',userAuth.adminJwt,adminController.getUsers)
router.post("/delete_user",userAuth.adminJwt,adminController.deleteUsers)
router.post('/add_User',userAuth.adminJwt,adminController.addUsers)
router.post('/edit_Profile', userAuth.adminJwt,adminController.edit_User)


module.exports= router