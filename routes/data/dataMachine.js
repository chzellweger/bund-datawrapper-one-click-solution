const router = require('express').Router()

const csvjson = require('csvjson')

const handleData = require('../../controllers/data/handleData')

router.get('/:vote/csv', async (req, res) => {
  try {
    const data = await handleData(req.params.vote)

    res.set({'content-type': 'text/csv'})
    res.send(data)
    res.end()
  } catch(error) {
    res.json({status: "failed", message: error})
    res.end()
  }
})

router.get('/:vote/json', async (req, res) => {
  try {
    const data = await handleData(req.params.vote)

    const json = csvjson.toObject(data)

    res.json(json)
    res.end()
  } catch(error) {
    res.json({status: "failed", message: error})
    res.end()
  }
})

module.exports = router
