import express from 'express'
import { properties } from '../controllers/ApiController.js'


const router = express.Router()

router.get('/properties', properties )

export default router