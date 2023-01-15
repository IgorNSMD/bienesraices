import { check, validationResult } from 'express-validator'

import User from '../model/User.js'

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


    // Almacenar un usuario
    await User.create({
        name, email, password,
        token: 123
    })

    // console.log(userExists)
    // return;


    //console.log(req.body)
    // const user = await User.create(req.body)
    // res.json(user)
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
    getRecoverPassword,

}