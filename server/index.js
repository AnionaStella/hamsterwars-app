const express = require('express')
const app = express()
// const authKey = require('./auth')
app.use(express.json())

// let auth = (req, res, next) => {
//   const apiKey = authKey
//   if (req.method !== 'GET') {
//     if (apiKey === req.headers['authorization']) {
//       next()
//     } else {
//       res.status(403).send({
//         msg: 'Incorrect key, update and try again'
//       })
//     }
//   } else {
//     next()
//   }

// }
// app.use(auth)

app.use(express.static(__dirname + '/../build'));

app.use('/api/assets', express.static(__dirname + '/assets'))

const chartsRoute = require('./routes/charts')
app.use('/api/charts', chartsRoute)

const gamesRoute = require('./routes/games')
app.use('/api/games', gamesRoute)

const hamstersRoute = require('./routes/hamsters')
app.use('/api/hamsters', hamstersRoute)

const statsRoute = require('./routes/stats')
app.use('/api/stats', statsRoute)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server up and running on ' + port)
})