//eslint-disable-next-line
const router = require('express').Router()

const csvjson = require('csvjson')

const checkParams = require('../../controllers/services/middleware/middleware').checkParams

const handleData = require('../../controllers/data/handleData')

router.get('/:voteId', checkParams, async (req, res) => {
  const voteId = req.params.voteId

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

    res.status(error.status || 500).json({status: 'failed', message: error.message})
  }
})

module.exports = router
