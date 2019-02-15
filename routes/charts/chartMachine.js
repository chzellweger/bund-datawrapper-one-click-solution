//eslint-disable-next-line
const router = require('express').Router()

const checkParams = require('../../services/middleware/middleware').checkParams
const handleCharts = require('../../controllers/charts/handleCharts')

router.post('/:voteId', checkParams, async (req, res) => {
  console.log(req.params)

  const voteId = req.params.voteId

  try {
    const publicUrl = await handleCharts(voteId)

    const response = {
      status: 'ok',
      payload: req.params,
      chart: publicUrl
    }

    res.json(response)
  } catch (error) {
    console.log(error)

    res.status(error.status || 500).json({ status: 'failed', message: error.message })
  }
})

module.exports = router
