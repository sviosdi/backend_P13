import express from 'express'
const router = express.Router()

import * as transactionController from '../controllers/transactionController.js'
import validateToken from '../middleware/tokenValidation.js'

router.post('/create', transactionController.createTransaction)

export default router
