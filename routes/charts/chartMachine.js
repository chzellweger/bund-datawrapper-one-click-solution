const router = require('express').Router()

const handleCharts = require('../../controllers/charts/handleCharts')

router.get('/:action/:vote', async (req, res) => {
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

module.exports = router
