import express from 'express'
import {getLogin, getRegister, postRegister, getRecoverPassword} from '../controllers/UserController.js'

const router = express.Router();

router.get('/login', getLogin)

router.get('/register', getRegister )

router.post('/register', postRegister )

router.get('/recover-password', getRecoverPassword )

// router.get('/', (req,res)=>{
//     res.send('Hola mundo en express..')
// })

// router.route('/')
//       .get( (req,res)=>{res.json({msg: 'Hola Mundo...'})} )
//       .post( (req,res)=>{res.json({msg: 'Respuesta tipo post...'})} )

export default router