
import express from 'express'
import { body } from 'express-validator'

import { admin,create,save,addImage } from '../controllers/PropertieController.js'
import protectRoute from '../middleware/protectRoute.js';



const router = express.Router();

router.get('/my-properties', protectRoute, admin)
router.get('/properties/create', protectRoute, create)

router.post('/properties/create', protectRoute, 
    body('title').notEmpty().withMessage('El título del anuncio es obligatorio'),
    body('description')
        .notEmpty().withMessage('El campo descripción es obligatorio')
        .isLength({max:200}).withMessage('La descripción es muy larga...'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('price').isNumeric().withMessage('Selecciona una rango de precio'),
    body('bedrooms').isNumeric().withMessage('Selecciona cantidad de habitiaciones'),
    body('parking').isNumeric().withMessage('Selecciona cantidad de estacionamientos'),
    body('toilets').isNumeric().withMessage('Selecciona cantidad de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    save
    )

router.get('/properties/add-image/:id',  protectRoute, addImage)

router.delete('/properties/:id', protectRoute, create)
export default router