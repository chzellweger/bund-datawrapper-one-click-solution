//eslint-disable-next-line
const router = require('express').Router()

const handleCharts = require('../../controllers/charts/handleCharts')

router.get('/:vote', async (req, res) => {
  console.log(req.params)
  try {
    const publicUrl = await handleCharts(req.params.vote)

    const response = {
      "status": "ok",
      payload: req.params,
      chart: publicUrl
    }
    res.json(response)
    res.end()
  } catch (error) {
    res.status(400).json({status: "failed", message: error.message})
    res.end()
  }
})

module.exports = router
