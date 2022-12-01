import * as transactionService from '../services/transactionServices.js'

const createTransaction = async (req, res) => {
    let response = {}

    try {
        const responseFromService = await transactionService.createTransaction(
            req.body
        )
        response.status = 200
        response.message = 'Transaction successfully created'
        response.body = {
            _id: responseFromService._id,
            owner: responseFromService.owner,
            owner_firstname: responseFromService.firstName,
            owner_lastname: responseFromService.lastName,
            emitter: responseFromService.name,
            description: responseFromService.description,
            amount: responseFromService.amount,
        }
    } catch (error) {
        console.error(
            'Something went wrong /transactions/create in transactionController.js',
            error
        )
        response.status = 400
        response.message =
            'Something went wrong in the server with /transactions/create in transactionController.js'
        response.more = error.message
    }
    return res.status(response.status).send(response)
}
/*
const getTransaction = async (req, res) => {
    let response = {}

    try {
        const responseFromService = await transactionService.getTransaction(req)
        response.status = 200
        response.message = 'Successfully got transaction data'
        response.body = responseFromService
    } catch (error) {
        console.log('Error in transactionController.js')
        response.status = 400
        response.message = {
            message:
                'Something went wrong in the server with /transactions/get in transactionController.js',
            more: error.message,
        }
    }

    return res.status(response.status).send(response)
}
*/
const getTransactions = async (req, res) => {
    let response = {}

    try {
        const transac = await transactionService.getTransactions(req)
        response.status = 200
        response.message = 'Successfully got transactions'
        response.body = transac
    } catch (error) {
        console.log('Error in transactionsController.js')
        response.status = 400
        response.message = {
            message:
                'Something went wrong in the server with /transactions/getall in transactionsController.js',
            more: error.message,
        }
    }

    return res.status(response.status).send(response)
}

const updateTransaction = async (req, res) => {
    console.log(req)
    let response = {}

    try {
        const transac = await transactionService.updateTransaction(req)
        response.status = 200
        response.message = 'Transaction successfully updated'
    } catch (error) {
        console.log('Error in transactionsController.js')
        response.status = 400
        response.message =
            'Something went wrong in the server with /transactions/update in transactionsController.js'
        response.more = error.message
    }

    return res.status(response.status).send(response)
}

const getBalance = async (req, res) => {
    let response = {}

    try {
        const transac = await transactionService.getBalance(req)
        response.status = 200
        response.message = 'Successfully got checking balance'
        response.body = transac
    } catch (error) {
        console.log('Error in transactionsController.js')
        response.status = 400
        response.message =
            'Something went wrong in the server with /transactions/balance in transactionsController.js'
        response.more = error.message
    }
    return res.status(response.status).send(response)
}

export {
    createTransaction,
    /*getTransaction,*/
    getTransactions,
    updateTransaction,
    getBalance,
}
