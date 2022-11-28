import User from '../database/models/userModel.js'
import Transaction from '../database/models/transactionModel.js'
import jwt from 'jsonwebtoken'

const createTransaction = async (dataFromRequest) => {
    try {
        const newTransaction = new Transaction(dataFromRequest)
        const user = await User.findOne({ _id: dataFromRequest.owner })
        if (!user) {
            throw new Error('Cannot create transaction: no such user concerned')
        }
        let result = await newTransaction.save()
        result.firstName = user.firstName
        result.lastName = user.lastName
        return result
    } catch (error) {
        console.error('Error in userService.js', error)
        throw new Error(error)
    }
}

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

const getCheckingBalance = async (req) => {
    try {
        const jwtToken = req.headers.authorization.split('Bearer')[1].trim()
        const decodedJwtToken = jwt.decode(jwtToken)
        const user = await User.findOne({ _id: decodedJwtToken.id })

        if (!user) {
            throw new Error(
                'Error: unidentified user attempted to get transactions'
            )
        }

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
    getTransaction,
    getTransactions,
    updateTransaction,
    getCheckingBalance,
}
