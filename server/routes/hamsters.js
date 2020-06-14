const {
  Router
} = require('express')
const {
  auth,
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


// result update for hamsters, now moved to games POST

// router.put('/:id/result', async (req, res) => {
//   try {
//     let hamsterRef = await db.collection('hamsters').doc(req.params.id).get()
//     let hamster = hamsterRef.data();

//     if (req.body.won) {
//       hamster.wins += 1
//     } else {
//       hamster.defeats += 1
//     }
//     hamster.games += 1

//     db.collection('hamsters').doc(req.params.id).set(hamster)
//       .then(res.status(200).send(hamster))
//       .catch(err => {
//         throw err
//       })
//   } catch (err) {
//     console.error(err)
//     res.status(500).send(err)
//   }
// })


module.exports = router;