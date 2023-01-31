import { Price, Category, Property } from '../model/index.js'

const start = async (req,res) => {
    
    const [ categories, prices ] = await Promise.all([
        Category.findAll({ raw: true }),
        Price.findAll({ raw: true })
    ])

    console.log( categories )

    res.render('start',{
        pageLabel:'Inicio',
        categories, prices
    })
}

const category = (req,res) => {

}

const notfound = (req,res) => {

}

const search = (req,res) => {

}

export {
    start,
    category,
    notfound,
    search
}