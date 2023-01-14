

const formLogin =(req,res) =>{
    res.render('auth/login',{
        authenticated: true,
        pageLabel: 'Iniciar Sesión'
    })
}

const formRegister =(req,res) =>{
    res.render('auth/register',{
        authenticated: false,
        pageLabel: 'Crear Cuenta'
    })
}

const formRecoverPassword =(req,res) =>{
    res.render('auth/recover-password',{
        authenticated: false,
        pageLabel: 'Recuperar Contraseña'
    })
}

export {
    formLogin,
    formRegister,
    formRecoverPassword
}