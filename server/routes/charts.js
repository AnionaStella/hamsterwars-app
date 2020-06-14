const {
  Router
} = require('express')
const {
  auth,
  db
} = require('../firebase')

const router = new Router()

//function to get hamsters based on query
async function getHamsterArray(orderBy) {
  let fbHamsters = await db.collection('hamsters').orderBy(orderBy, 'desc').limit(5).get()
  let hamsters = []
  fbHamsters.forEach(doc => {
    hamsters.push(doc.data())
  })
  return hamsters;
}

// find hamsters with most wins
router.get('/top', async (req, res) => {
  try {

    res.status(200).send(await getHamsterArray("wins"))

  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

// find hamsters with most defeats
router.get('/bottom', async (req, res) => {
  try {

    res.status(200).send(await getHamsterArray("defeats"))

  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

module.exports = router