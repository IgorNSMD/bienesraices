import express from 'express'
import { start,category, notfound, search } from '../controllers/AppController.js'

const router = express.Router();

// Pagina de inicio
router.get('/', start)
// Categorias
router.get('/categories/:id', category)

//Pagina 404
router.get('/404', notfound)

// Buscador
router.post('/search', search)

export default router;

