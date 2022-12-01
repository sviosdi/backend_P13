import express from 'express'
const router = express.Router()

import * as transactionController from '../controllers/transactionController.js'
import validateToken from '../middleware/tokenValidation.js'

router.post('/create', transactionController.createTransaction)
//router.post('/get', validateToken, transactionController.getTransaction)
router.post('/getall', validateToken, transactionController.getTransactions)
router.post('/balance', validateToken, transactionController.getBalance)
router.put('/update', validateToken, transactionController.updateTransaction)

export default router
