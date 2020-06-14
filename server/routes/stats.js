const {
  Router
} = require('express')
const {
  auth,
  db
} = require('../firebase')

const router = new Router()

// get stats for total amount of games, or hamster that battled the most
router.get('/:option', async (req, res) => {

  if (req.params.option == "total") {
    try {
      let gamesRef = await db.collection('games').get()
      let amountOfGames = gamesRef.size

      res.status(200).send({
        totalGames: amountOfGames
      })
    } catch (err) {
      console.error(err)
      res.status(500).send('Sorry, could not find total amount of games')
    }
  } else if (req.params.option == "battled-most") {
    try {
      let veteranHamster
      let mostDocs = await db.collection('hamsters').orderBy('games', 'desc').limit(1).get()
      mostDocs.forEach(doc => {
        veteranHamster = doc.data()
      })
      res.status(200).send(veteranHamster)

    } catch (err) {
      console.error(err)
      res.status(500).send('sorry, could not find hamster that battled the most')
    }

  }

})

module.exports = router;