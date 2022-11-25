import Transaction from '../database/models/transactionModel.js'
import jwt from 'jsonwebtoken'

const createTransaction = async (dataFromService) => {
    try {
        const newTransaction = new Transaction(dataFromService)
        let result = await newTransaction.save()
        return result
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

export { createTransaction }
