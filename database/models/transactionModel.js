import mongoose from 'mongoose'
const { Schema } = mongoose

// Une transaction ne doit pouvoir être créée que pour un utilisateur existant. (Pas nécessairement identifié, mais existant) et par un service sécurisé
// étant seul habilité à initier une telle transaction.
// N'ayant pas de contrôle sur qui peut initier la transaction, on vérifira ici seulement que l'utilisateur est existant.
const transactionSchema = new Schema(
    {
        initiator: { type: String, default: 'Secure-verified-service' },
        owner: { type: mongoose.ObjectId, required: true },
        emitter: {
            iban: { type: String, default: 'FR76 0001 0011 01101110010010 ' },
            name: { type: String, default: 'Golden Sun Bakery' },
        },
        date: { type: Date, default: Date.now },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        balance: { type: Number, required: true },
        transaction_type: { type: String, required: true },
        category: { type: String, default: '' },
        notes: { type: String, default: '' },
    },
    {
        timestamps: true,
        toObject: {
            transform: (doc, ret, options) => {
                delete ret.initiator
                delete ret.owner
                const e = ret.emitter.name
                ret.emitter = e
                delete ret.__v
                return ret
            },
        },
    }
)

export default mongoose.model('Transaction', transactionSchema)
