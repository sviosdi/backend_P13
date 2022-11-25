import connect from './database/connection.js'

import { createUser, createTransaction } from './services/userServices.js'

const tony = {
    firstName: 'Jeff',
    lastName: 'Besos',
    email: 'jeff@besos.com',
    password: 'amazon',
}

const transac = {
    description: 'Golden Sun Backery',
    amount: 40,
    balance: 2187.52,
    transaction_type: 'Electronic',
}

connect()
//const user = createUser(tony)
//user.then((data) => console.log(data))

const transac_1 = createTransaction(transac)
transac_1.then((data) => console.log(data))
