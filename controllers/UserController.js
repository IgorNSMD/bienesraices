import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

import User from '../model/User.js'
import { generateId } from '../helpers/token.js'
import { emailRegister, emailRecoverPassword } from '../helpers/emails.js'

const getLogin =(req,res) =>{
    res.render('auth/login',{
        authenticated: true,
        pageLabel: 'Iniciar Sesión'
    })
}

const getRegister =(req,res) =>{

    //console.log( req.csrfToken() )

    res.render('auth/register',{
        authenticated: false,
        pageLabel: 'Crear Cuenta',
        csrfToken: req.csrfToken()
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
                csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
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
        csrfToken: req.csrfToken(),
        pageLabel: 'Recuperar Contraseña'
    })
}

const postResetPassword = async(req,res)=>{

    // Validaciones
    await check('email').isEmail().withMessage('Ingrese Email correctamente..').run(req)

    let result = validationResult(req)

    // verificar result esté vacio
    if(!result.isEmpty()){
        //Existen errores...
        return res.render('auth/recover-password',{
            csrfToken: req.csrfToken(),
            pageLabel: 'Recuperar Contraseña',
            errors: result.array()
        })
    }

    // Buscar usuario
    const { email } = req.body
    const user = await User.findOne({where: { email }})
    
    //console.log(user)

    if (!user){
        return res.render('auth/recover-password',{
            csrfToken: req.csrfToken(),
            pageLabel: 'Recuperar Contraseña',
            errors: [{msg: 'El email no pertenece a ningún usuario..'}]
        })       
    }

    // Generar token y enviar email
    user.token = generateId()
    await user.save();

    // Enviar correo
    emailRecoverPassword({
        email: user.email,
        name: user.name,
        token: user.token
    })

    // Renderizar un mensaje
    res.render('template/message',{
        pageLabel: 'Reestablecer tu password',
        message: 'Enviamos un correo con las instrucciones'
    })

}


const getCheckToken = async(req,res) => {

    //console.log('getCheckToken...')
    
    const { token } = req.params

    const user = await User.findOne({where: {token}})
    
    if(!user){
        return res.render('auth/confirm-account',{
            pageLabel: 'Reestablece tu contraseña...',
            message: 'Hubo un error al validar tu contraseña, intenta de nuevo',
            error: true        
        })
    }

    // Mostrar formulario para modificar password
    res.render('auth/reset-password',{
        pageLabel: ' Reestablecer tu contraseña',
        csrfToken: req.csrfToken(),
    })
 
}

const postNewPassword = async(req,res) => {

   // Validar la nueva password
    await check('password').isLength({min:6}).withMessage('Ingrese Contraseña correctamente..').run(req)


    let result = validationResult(req)
    // verificar result esté vacio
    if(!result.isEmpty()){
        //Existen errores...
        return res.render('auth/reset-password',{
                authenticated: false,
                pageLabel: 'Reestablecer contraseña',
                csrfToken: req.csrfToken(),
                errors: result.array(),
        })
    }

    const { token } = req.params
    const { password } = req.body

   // identificar quien hace el cambio
    const user = await User.findOne({where: {token}})
    console.log(user)

   //hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash( password, salt )   
    user.token = null

    await user.save()

    res.render('auth/confirm-account',{
        pageLabel: 'Contraseña Reestablecida',
        message: 'Contraseña se grabó correctamente..'
    })

}

export {
    getLogin,
    getRegister,
    postRegister,
    getConfirm,
    getRecoverPassword,
    postResetPassword,
    getCheckToken,
    postNewPassword
}