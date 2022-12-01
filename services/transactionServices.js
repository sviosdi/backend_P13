import User from '../database/models/userModel.js'
import transactionSchema from '../database/models/transactionModel.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const createTransaction = async (reqBody) => {
    try {
        const user = await User.findOne({ _id: reqBody.owner })
        if (
            !user ||
            (reqBody.type !== 'checking' &&
                reqBody.type !== 'saving' &&
                reqBody.type !== 'card')
        ) {
            throw new Error(
                'Cannot create transaction: no such user concerned or the selected account is not of type "checking" or "saving" or "card"'
            )
        }

        const Transaction = mongoose.model('checking', transactionSchema)
        const newTransaction = new Transaction(reqBody)
        let result = await newTransaction.save()
        if (!result) throw new Error(`The transaction couldn't be created`)

        result.firstName = user.firstName
        result.lastName = user.lastName
        return result
    } catch (error) {
        console.error(
            'Error in userService.js : createTransaction failed',
            error
        )
        throw new Error(error)
    }
}
/*
const getTransaction = async (req) => {
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })

        if (!user) {
            throw new Error(
                'Error: unidentified user attempted to get a transaction'
            )
        }
        if (
            req.body.type !== 'checking' &&
            req.body.type !== 'saving' &&
            req.body.type !== 'card'
        ) {
            throw new Error(
                'Cannot get transaction: the selected account is not of type "checking" or "saving" or "card"'
            )
        }
        const Transaction = mongoose.model('checking', transactionSchema)
        const newTransaction = new Transaction(req.body)
        const transac = await Transaction.findOne({ _id: req.body._id })
        if (!transac)
            throw new Error(`no such transaction with such id ${req.body._id}`)
        if (!transac.owner.equals(user._id))
            throw new Error(
                'unidentified user attempted to get a transaction that he does not own'
            )
        return transac.toObject()
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}
*/
const getTransactions = async (req) => {
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })

        if (!user) {
            throw new Error(
                'Error: unidentified user attempted to get transactions'
            )
        }
        if (
            req.body.type !== 'checking' &&
            req.body.type !== 'saving' &&
            req.body.type !== 'card'
        ) {
            throw new Error(
                'Cannot get transactions: the selected account is not of type "checking" or "saving" or "card"'
            )
        }
        const Transaction = mongoose.model('checking', transactionSchema)
        const newTransaction = new Transaction(req.body)
        const transac = await Transaction.find({ owner: user._id }).sort({
            date: -1,
        })

        delete transac.createdAt
        delete transac.updatedAt
        /*if (!transac.owner.equals(user._id))
            throw new Error(
                'unidentified user attempted to get a transaction that he does not own'
                console.log(transac)
            )*/
        return transac.map((t) => t.toObject())
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

const updateTransaction = async (req) => {
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })

        if (!user) {
            throw new Error(
                'Error: unidentified user attempted to update a transaction'
            )
        }
        if (
            req.body.type !== 'checking' &&
            req.body.type !== 'saving' &&
            req.body.type !== 'card'
        ) {
            throw new Error(
                'Cannot get transactions: the selected account is not of type "checking" or "saving" or "card"'
            )
        }
        const Transaction = mongoose.model('checking', transactionSchema)
        const newTransaction = new Transaction(req.body)
        const transac = await Transaction.findOneAndUpdate(
            { _id: req.body._id },
            { notes: req.body.notes, category: req.body.category },
            { new: true }
        )

        return transac.toObject()
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

const getBalance = async (req) => {
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })

        if (!user) {
            throw new Error('Error: unidentified user attempted to get balance')
        }
        if (
            req.body.type !== 'checking' &&
            req.body.type !== 'saving' &&
            req.body.type !== 'card'
        ) {
            throw new Error(
                `Cannot get balance of ${req.body.type} account: the selected account is not of type 'checking' or 'saving' or 'card'`
            )
        }
        const Transaction = mongoose.model('checking', transactionSchema)
        const newTransaction = new Transaction(req.body)
        const transac = await Transaction.find({ owner: user._id })
            .sort({ date: -1 })
            .limit(1)
        return { balance: transac[0].balance.toFixed(2) }
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

export {
    createTransaction,
    /*getTransaction,*/
    getTransactions,
    updateTransaction,
    getBalance,
}
