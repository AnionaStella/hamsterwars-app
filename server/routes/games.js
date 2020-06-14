const {
  Router
} = require('express')
const {
  auth,
  db
} = require('../firebase')

const router = new Router()

// create new game between hamsters
router.post('/', (req, res) => {
  try {
    let game = {
      timestamp: new Date(),
      contestants: req.body.contestants,
      winner: req.body.winner
    }

    //find hamsters and update wins, defeats and games played 
    let contestants = req.body.contestants
    contestants.forEach(async contestant => {
      let hamsterSnapshot = await db.collection('hamsters').doc('' + contestant.id).get()
      let hamster = hamsterSnapshot.data()
      if (hamster.id === req.body.winner.id) {
        hamster.wins += 1
      } else {
        hamster.defeats += 1
      }
      hamster.games += 1
      db.collection('hamsters').doc('' + hamster.id).set(hamster)
    })

    // add game to games collection, respond with the gameobject
    db.collection('games').add(game)
    res.status(200).send(game)
  } catch (err) {
    console.error(err)
    res.status(500).send('Oops, something went wrong. New match was not posted.')
  }

})

// get all games
router.get('/', async (req, res) => {
  try {
    let gameDocs = await db.collection('games').get()
    let games = []
    gameDocs.forEach(doc => {
      games.push(doc.data())
    })

    res.status(200).send(games)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong, could not find any games')
  }

})

module.exports = router