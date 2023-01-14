import express from 'express'
import {formLogin, formRegister, formRecoverPassword} from '../controllers/UserController.js'

const router = express.Router();

router.get('/login', formLogin)
router.get('/register', formRegister )
router.get('/recover-password', formRecoverPassword )

// router.get('/', (req,res)=>{
//     res.send('Hola mundo en express..')
// })

// router.route('/')
//       .get( (req,res)=>{res.json({msg: 'Hola Mundo...'})} )
//       .post( (req,res)=>{res.json({msg: 'Respuesta tipo post...'})} )

export default router