const express = require('express')
const app = express()
const paginatedResults = require('./middleware')

const users = []
for (let i = 1; i <= 15; i++) {
    users.push({ id: i, name: `User ${i}` })
}
// users?page=1&limit=5
app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults)
})


app.listen(3000)