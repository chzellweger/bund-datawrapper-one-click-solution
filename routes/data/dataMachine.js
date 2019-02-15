//eslint-disable-next-line
const router = require('express').Router()

const csvjson = require('csvjson')

const handleData = require('../../controllers/data/handleData')

router.get('/:vote', async (req, res) => {
  try {
    const vote = req.params.vote
    const requestDataType = req.query['data-type']

    const data = await handleData(vote)

    res.set({'Access-Control-Allow-Origin': '*'})

    if (requestDataType === 'csv') {
      res.set({'Content-Disposition': `attachment filename=abstimmung${vote}.csv`})
      res.send(data)
      res.end()
    } else if (requestDataType === 'json') {
      const json = csvjson.toObject(data)
      res.json(json)
      res.end()
    } else {
      throw new Error("requested data-type is unknown. request '?data-type=<json|csv]>''")
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({status: "failed", message: error.message})
    res.end()
  }
})

module.exports = router
