import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
    {
        email: String,
        password: String,
        firstName: String,
        lastName: String,
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

export default mongoose.model('User', userSchema)
