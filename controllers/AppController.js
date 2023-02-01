import { Price, Category, Property } from '../model/index.js'

const start = async (req,res) => {
    
    const [ categories, prices, houses, departments ] = await Promise.all([
        Category.findAll({ raw: true }),
        Price.findAll({ raw: true }),
        Property.findAll({ 
            limit: 3,
            where: {
                categoryid: 1
            },
            include: [
                {
                    model: Price, as:'price'
                }
            ],
            order: [
                ['createdAt','DESC']
            ]
         }),
         Property.findAll({ 
            limit: 3,
            where: {
                categoryid: 2
            },
            include: [
                {
                    model: Price, as:'price'
                }
            ],
            order: [
                ['createdAt','DESC']
            ]
         })
    ])

   // console.log( categories )

    res.render('start',{
        pageLabel:'Inicio',
        categories, prices, houses, departments
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