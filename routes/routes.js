const router = require('express').Router();

const csvjson = require('csvjson')

const handleCharts = require('../controllers/handleCharts')
const handleData = require('../controllers/handleData')

router.get('/machine/:action/:vote', async (req, res) => {
  console.log(req.params)
  try {
    const publicUrl = await handleCharts(req.params)

    res.json({
      status: "ok",
      publicUrl,
      payload: req.params,
    })
    res.end()
  } catch(error) {
    res.json({status: "failed", message: error})
    res.end()
  }
})

router.get('/data/:vote/csv', async (req, res) => {
  try {
    const data = await handleData(req.params.vote)

    res.set({'content-type': 'text/csv'})
    res.send(data)

    res.json(data)
    res.end()
  } catch(error) {
    res.json({status: "failed", message: error})
    res.end()
  }
})

router.get('/data/:vote/json', async (req, res) => {
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