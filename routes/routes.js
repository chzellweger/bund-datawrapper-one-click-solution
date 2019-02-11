const router = require('express').Router();

const handleCharts = require('../controllers/handleCharts')

router.get('/:action/:vote', async (req, res) => {
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

module.exports = router