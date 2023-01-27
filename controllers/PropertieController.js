import { validationResult } from 'express-validator'

import { Price,Category, Property } from '../model/index.js'

// import Price from '../model/Price.js'
// import Category from '../model/Category.js'

const admin = async(req,res) => {
    
    const { id } = req.user
    
    console.log( id )
    const properties = await Property.findAll({
        where: {
            userid:id
        }
        ,
        include: [
            { model: Category, as: 'category' },
            { model: Price, as: 'price' }
        ]
    })

    res.render('properties/admin',{
        pageLabel: 'Mis propiedades',
        properties
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


const saveFile = async( req, res, next ) =>{

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


    if(req.user.id.toString() !== property.userid.toString()){
        return res.redirect('/my-properties')
    }

    try {
        console.log(req.file)


        // almacenar imagen y publicar propiedad
        property.picture = req.file.filename
        property.published = 1

        await property.save()

        next()

    } catch (error) {
        console.log(error)
        
    }
}

const edit = async(req,res) =>{

    const { id } = req.params

    // Validar que propiedad exista
    const property = await Property.findByPk( id )

    if(!property){
        return res.redirect('/my-properties')
    }

    // Revisar quien visita la URL es el creó la propiedad
    if(property.userid.toString() !== req.user.id.toString()){
        return res.redirect('/my-properties')
    }

    // Modelo de precios y categorias
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('properties/edit',{
        pageLabel: 'Editar propiedad',
        categories,
        prices,
        csrfToken: req.csrfToken(),
        info:{}
    })
}

export {
    admin,
    create,
    save,
    addImage,
    saveFile,
    edit
}