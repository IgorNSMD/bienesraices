
import express from 'express'
import { body } from 'express-validator'

import { admin,create,save,addImage, saveFile,edit, saveChange, remove, showProperty } from '../controllers/PropertieController.js'

import protectRoute from '../middleware/protectRoute.js';
import fileUpload from '../middleware/fileUpload.js'
import IdentifyUser from '../middleware/identifyUser.js'

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

router.post('/properties/add-image/:id', protectRoute, fileUpload.single('image'), saveFile )


router.get('/properties/edit/:id', protectRoute, edit)


router.post('/properties/edit/:id', protectRoute, 
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
    saveChange
    )

router.post('/properties/remove/:id', protectRoute, remove)

//Area Publica
router.get('/property/:id', 
    IdentifyUser,
    showProperty
    )

export default router