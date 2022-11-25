import mongoose from 'mongoose'

const databaseUrl =
    process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB'

export default async () => {
    try {
        mongoose.connect(databaseUrl, { useNewUrlParser: true })
        console.log('Database successfully connected')
    } catch (error) {
        console.error(`Database Connectivity Error: ${error}`)
        throw new Error(error)
    }
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if the database has auth enabled
}
