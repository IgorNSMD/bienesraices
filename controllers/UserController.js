import { check, validationResult } from 'express-validator'

import User from '../model/User.js'
import { generateId } from '../helpers/token.js'
import { emailRegister } from '../helpers/emails.js'

const getLogin =(req,res) =>{
    res.render('auth/login',{
        authenticated: true,
        pageLabel: 'Iniciar Sesión'
    })
}

const getRegister =(req,res) =>{
    res.render('auth/register',{
        authenticated: false,
        pageLabel: 'Crear Cuenta'
    })
}

const postRegister =async(req,res) =>{

    //console.log(req.body)

    // Validaciones
    await check('name').notEmpty().withMessage('Ingrese Nombre..').run(req)
    await check('email').isEmail().withMessage('Ingrese Email correctamente..').run(req)
    await check('password').isLength({min:6}).withMessage('Ingrese Contraseña correctamente..').run(req)
    //await check('repeat').equals('password').withMessage('Contraseña no coincide..').run(req)
    await check('repeat').custom(async (repeat, {req}) => {
            const password = req.body.password
    
            // If password and confirm password not same
            // don't allow to sign up and throw error
            if(password !== repeat){
            throw new Error('Contraseña no coincide')
            }
      }).run(req)

    let result = validationResult(req)

    //console.log(result)
    //return;


    // verificar result esté vacio
    if(!result.isEmpty()){
        //Existen errores...
        return res.render('auth/register',{
                authenticated: false,
                pageLabel: 'Crear Cuenta',
                errors: result.array(),
                user: {
                    name:req.body.name,
                    email:req.body.email
                }
        })
    }

    // verificar que el usuario no esté duplicado
    const { name, email, password } = req.body

    const userExists = await User.findOne({ where : { email } })
    if (userExists){
        return res.render('auth/register',{
            authenticated: false,
            pageLabel: 'Crear Cuenta',
            errors: [{msg:'El Usuario ya está registrado'}],
            user: {
                name: name,
                email: email
            }
    })
    }

    // Envia correo de confirmación 

    // Almacenar un usuario
    const user =  await User.create({
        name, email, password,
        token: generateId()
    })

    // Envia correo con mensaje de confirmación
    emailRegister({
        name: user.name,
        email: user.email,
        token: user.token
    })

    res.render('template/message',{
        pageLabel: 'Cuenta Creada Correctamente...',
        message: 'Enviamos un correo de confirmación, presiona en el enlace...'
    })

    // console.log(userExists)
    // return;


    //console.log(req.body)
    // const user = await User.create(req.body)
    // res.json(user)
}

// Funcion que comprueba una cuenta
const getConfirm = async(req, res) =>{
    
    const { token } = req.params


    // console.log( token )

    // verificar si el token es válido
    const user = await User.findOne( { where: { token } } )

    
    if(!user){
        return res.render('auth/confirm-account',{
            pageLabel: 'Error confirmar cuenta...',
            message: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true        
        })
    }

    // confirmar la cuenta
    user.token = null
    user.confirmed = true
    await user.save();

    res.render('auth/confirm-account',{
        pageLabel: 'Cuenta confirmada',
        message: 'La cuenta se confirmó correctamente...'
    })    

    console.log( user )
    
}




const getRecoverPassword =(req,res) =>{
    res.render('auth/recover-password',{
        authenticated: false,
        pageLabel: 'Recuperar Contraseña'
    })
}

export {
    getLogin,
    getRegister,
    postRegister,
    getConfirm,
    getRecoverPassword,

}