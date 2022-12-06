import axios from 'axios'

const createApi =
    'https://qu8rc9-3001.preview.csb.app/api/v1/transactions/create'

const amounts = [
    [51.2, 30.2, 450, 89.3, 256.21, 145.3, 200.0],
    [15.3, 84.5, 630, 55.4, 149.8, 88.9, 150],
]

const startBalance = [2530.24, 1425.3] // => 1308.03, 251.40

const createTransacs = (idx) => {
    const transacs = []
    for (const i in T) {
        const t = { ...T[i] }
        t.type = 'checking'
        let newBalance = startBalance[idx] - amounts[idx][i]
        t.balance = startBalance[idx] - amounts[idx][i]
        startBalance[idx] = newBalance
        t.amount = amounts[idx][i]
        t.date = new Date(
            `2022-11-${17 + i * 2}T${10 + i * 1}:${15 + i * 3}:${10 + 5 * i}`
        )
        console.log(idx, ':', owners[idx])
        t.owner = owners[idx]
        transacs.push(t)
    }
    return transacs
}

const T = [
    {
        description: 'Carrefour Market',
        transaction_type: 'Electronic',
    },
    {
        description: 'Carrefour Market',
        transaction_type: 'Electronic',
    },
    {
        description: "Jeff'Computers - PC Tower",
        transaction_type: 'Electronic',
    },
    {
        description: 'Brico Dépot',
        transaction_type: 'Electronic',
    },
    {
        description: 'GMF assurance',
        transaction_type: 'Check',
    },
    {
        description: 'Garage AD',
        transaction_type: 'Electronic',
    },
    {
        description: 'Argent Bank',
        transaction_type: 'withdrawal',
    },
]

const owners = ['6388f39096dec31bef84f5cd', '6388f38f96dec31bef84f5cb'] // [steve, tony]
// steve
const tokens = [
    // steve , tony
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhmMzkwOTZkZWMzMWJlZjg0ZjVjZCIsImlhdCI6MTY2OTkyMjg0NiwiZXhwIjoxNjcwMDA5MjQ2fQ.trTSL_1aPcokC98gfLKBLFK1jphk_y-GIU09XcJRyP0',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhmMzhmOTZkZWMzMWJlZjg0ZjVjYiIsImlhdCI6MTY2OTkyMjcwNSwiZXhwIjoxNjcwMDA5MTA1fQ.LcW9c7CpV93ZzBI15BZujJ3--pLebvY416rzu17lwnE',
]

const transacs = [createTransacs(0), createTransacs(1)]

//.log(transacs)

transacs.forEach((transac, idx) => {
    const config = { headers: { Authorization: `Bearer ${tokens[idx]}` } }

    transac.forEach((tr) => {
        console.log(tr)
        axios
            .post(createApi, tr, config)
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => console.log('something went wrong'))
    })
})
