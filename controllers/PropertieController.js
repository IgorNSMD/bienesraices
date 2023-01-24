import Price from '../model/Price.js'
import Category from '../model/Category.js'

const admin = (req,res) => {
    res.render('properties/admin',{
        pageLabel: 'Mis propiedades',
        barra:true
    })
}

// Formulario para crear nueva propiedad
const create = async (req,res) => {
    
    // Modelo de precios y categorias
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/create',{
        pageLabel: 'Crear propiedad',
        barra:true,
        categories,
        prices
    })
}

export {
    admin,
    create
}