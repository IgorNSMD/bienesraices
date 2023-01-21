const admin = (req,res) => {
    res.render('properties/admin',{
        pageLabel: 'Mis propiedades',
        barra:true
    })
}

// Formulario para crear nueva propiedad
const create = (req,res) => {
    res.render('properties/create',{
        pageLabel: 'Crear propiedad',
        barra:true
    })
}

export {
    admin,
    create
}