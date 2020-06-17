const {
  Router
} = require('express')
const {
  db
} = require('../firebase')

const router = new Router()

function getHamsterArray(hamsterRef) {
  let hamsters = [];
  hamsterRef.forEach(doc => {
    hamsters.push(doc.data())
  })
  return hamsters
}

//get all hamsters
router.get('/', async (req, res) => {
  try {
    res.status(200).send(getHamsterArray(await db.collection('hamsters').get()))
  } catch (err) {
    res.status(500)
    console.error(err)
  }
})

//get hamster with id or get random hamster
router.get('/:id', async (req, res) => {
  try {
    if (req.params.id !== "random") {
      // Firebase är type sensitive
      let hamster = await db.collection('hamsters').doc(req.params.id).get()
      res.status(200).send(hamster.data())
    } else {
      let hamsters = getHamsterArray(await db.collection('hamsters').get())
      let randomHamster = Math.floor(Math.random() * (hamsters.length - 1))
      res.status(200).send(hamsters[randomHamster])
    }
  } catch (err) {
    res.status(500)
    console.error(err)
  }
})

router.post('/', async (req,res) => {

    // hämta hamsters.length och använd för att lägga id till ny hamster?
    let hamsters = getHamsterArray(await db.collection('hamsters').get())
    let id = hamsters.length + 1;

    try {
        let hamster = {
            id: id,
            age: req.body.age,
            name: req.body.name,
            imgName: 'hamster_emoji.png',    
            favFood: req.body.favFood,
            loves: req.body.loves,
            wins: 0,
            defeats: 0,
            games: 0
        }
        await db.collection('hamsters').doc('' + hamster.id).set(hamster)
        res.status(201).send(hamster)
    } catch (err) {
        console.error(err)
        res.status(500).send('Oops, something went wrong. New hamster was not posted.')
      }
 })



module.exports = router;