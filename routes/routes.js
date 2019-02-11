const router = require('express').Router();

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

router.get('/data/:vote', async (req, res) => {
  try {
    const data = await handleData(req.params.vote)

  } catch(error) {
    res.json({status: "failed", message: error})
    res.end()
  }
})

module.exports = router