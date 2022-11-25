import mongoose from 'mongoose'
const { Schema } = mongoose

const transactionSchema = new Schema(
    {
        date: { type: Date, default: Date.now },
        description: String,
        amount: Number,
        balance: Number,
        transaction_type: String,
        category: { type: String, default: '' },
        notes: { type: String, default: '' },
    },
    {
        timestamps: true,
        toObject: {
            transform: (doc, ret, options) => {
                ret.id = ret._id
                delete ret._id
                delete ret.password
                delete ret.__v
                return ret
            },
        },
    }
)

export default mongoose.model('Transaction', transactionSchema)
