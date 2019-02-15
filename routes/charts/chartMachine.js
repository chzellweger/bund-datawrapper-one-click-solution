//eslint-disable-next-line
const router = require('express').Router()

const handleCharts = require('../../controllers/charts/handleCharts')

router.post('/:voteId', async (req, res) => {
  console.log(req.params)

  const voteId = req.params.voteId

  if (!Number.isInteger(parseInt(voteId))) {
    res.status(400).json({
      status: 'failed',
      message: `cannot create chart with vote-id ${voteId}. Use an integer as vote-id.`
    })
    return
  }

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

    res.status(500).json({ status: 'failed', message: error.message })
  }
})

module.exports = router
