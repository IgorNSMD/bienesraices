
import express from 'express'
import { body } from 'express-validator'

import { admin,create,save } from '../controllers/PropertieController.js'

const router = express.Router();

router.get('/my-properties', admin)
router.get('/properties/create', create)

router.post('/properties/create', 
    body('title').notEmpty().withMessage('El título del anuncio es obligatorio'),
    save
    )

router.delete('/properties/:id', create)
export default router