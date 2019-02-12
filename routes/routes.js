const router = require('express').Router();

const csvjson = require('csvjson')

const handleCharts = require('../controllers/handleCharts')
const handleData = require('../controllers/handleData')

router.get('/machine/:action/:vote', async (req, res) => {
  console.log(req.params)
  try {
    const publicUrl = await handleCharts(req.params)

    const response = {
      "status": "ok",
      payload: req.params
    }

    if (req.params.action === 'start') {
      res.json(Object.assign(response, {publicUrl}))
    } else if (req.params.action === 'stop') {
      res.json(response)
    } else {
      throw new Error(`action unknown: ${rep.params.action}`)
    }
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
