const express = require('express')
const app = express()
// const authKey = require('./auth')
const cors = require('cors')
app.use(cors())
app.options('*', cors())
app.use(express.json())
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/../build')));// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '/../build', 'index.html'));
    });
  }

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