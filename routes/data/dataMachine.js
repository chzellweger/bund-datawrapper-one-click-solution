//eslint-disable-next-line
const router = require('express').Router()

const csvjson = require('csvjson')

const handleData = require('../../controllers/data/handleData')

router.get('/:voteId', async (req, res) => {
  const voteId = req.params.voteId

  if (!Number.isInteger(parseInt(voteId))) {
    res.status(400).json({
      status: 'failed',
      message: `cannot create chart with vote-id ${voteId}. Use an integer as vote-id.`
    })
    return
  }

  try {
    const requestDataType = req.query['data-type']

    const data = await handleData(voteId)

    res.set({'Access-Control-Allow-Origin': '*'})

    if (requestDataType === 'csv') {
      res.set({'Content-Disposition': `attachment filename=abstimmung${voteId}.csv`})
      res.send(data)
    } else if (requestDataType === 'json') {
      const json = csvjson.toObject(data)
      res.json(json)
    } else {
      throw new Error('requested data-type is unknown. request "?data-type=<json|csv]>"')
    }
  } catch (error) {
    console.log(error)

    res.status(400).json({status: 'failed', message: error.message})
  }
})

module.exports = router
