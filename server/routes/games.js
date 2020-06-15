const {
    Router
  } = require('express')
  const {
    db
  } = require('../firebase')
  
  const router = new Router()
  
  // create new game between hamsters
  router.post('/', (req, res) => {
    try {
      let game = {
        timestamp: new Date().getTime(),
        contestants: req.body.contestants,
        contestant1Id: req.body.contestants[0].id,
        contestant2Id: req.body.contestants[1].id,
        winner: req.body.winner
      }
  
      //find hamsters and update wins, defeats and games played 
      let contestants = req.body.contestants;
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

      contestants.forEach(contestant => {
          if (contestant.id === req.body.winner.id) {
            contestant.wins += 1
          } else {
            contestant.defeats += 1
          }
          contestant.games += 1
        }) 
  
      
      // add game to games collection, respond with the gameobject
      db.collection('games').add(game)
      res.status(201).send({
          contestants: contestants
        })
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
  
  router.get('/last/:id1/:id2', (req,res) => {
      try {
          db.collection('games') 
            .where('contestant1Id', '==', parseInt(req.params.id1))
            .where('contestant2Id', '==', parseInt(req.params.id2))
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }  
                snapshot.forEach(doc => {
                    res.status(200).send(doc.data())
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        } catch (err) {
          console.error(err)
          res.status(500).send('Something went wrong, could not find any games')
        }
  
  })
  
  module.exports = router

