import { validationResult } from 'express-validator'

import { Price,Category, Property } from '../model/index.js'

// import Price from '../model/Price.js'
// import Category from '../model/Category.js'

const admin = (req,res) => {
    res.render('properties/admin',{
        pageLabel: 'Mis propiedades'
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
        categories,
        prices,
        csrfToken: req.csrfToken(),
        info:{}
    })
}

const save = async(req,res) => {


    // Validacion
    let result = validationResult(req)

    // verificar result esté vacio
    if(!result.isEmpty()){
        // Modelo de precios y categorias
        const [ categories, prices ] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])        

        //Existen errores...
        return res.render('properties/create',{
        pageLabel: 'Crear propiedad',
        csrfToken: req.csrfToken(),
        categories,
        prices,
        errors: result.array(),
        info:req.body
    })
    }

    // Crear Registro

    const { title,description, bedrooms, parking, toilets, street, lat, lng, category, price } = req.body

    //console.log(req.body)
    //console.log(req.user)
    const { id: userid } = req.user

    try {

        const property = await Property.create({
            title,
            description,
            bedrooms, parking, toilets,
            street, lat, lng, 
            categoryid: category, 
            precioid: price,
            userid,
            picture:''

        })

        const { id } = property

        res.redirect(`/properties/add-image/${ id }`)



    } catch (error) {
        console.log(error)
    }

}

const addImage = async(req,res) => {
    //res.send('Add image...')

    const { id } = req.params

    // Validar que la propuiedad exista
    const property = await Property.findByPk(id)
    if(!property){
        return res.redirect('/my-properties')
    }

    // Validar que la propiedad esté publicada
    if(property.published){
        return res.redirect('/my-properties')
    }


    // Validar que la propiedad pertenece a quien visita esta página
    // console.log(req.user.id)
    
    // console.log(property.userid)

    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }


    res.render('properties/add-image',{
        pageLabel:`Agregar Imagen: ${ property.title }`,
        csrfToken: req.csrfToken(),        
        property
    })
}

export {
    admin,
    create,
    save,
    addImage
}