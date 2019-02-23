import { Request, Response } from 'express'

//eslint-disable-next-line
const router = require('express').Router()

import{ checkParams } from '../../services/middleware/middleware'

import { handleData } from '../../controllers/data/handleData'
import  dataHandlers from '../../services/data/dataHandlers'

router.get('/:voteId', checkParams, async (req: Request, res: Response) => {
  const voteId: string = req.params.voteId

  try {
    const requestDataType: string = req.query['data-type']

    const data = await handleData(voteId)

    res.set({'Access-Control-Allow-Origin': '*'})

    if (requestDataType === 'csv') {
      const csv = dataHandlers.dataToCsv(data)
      res.set({'Content-Disposition': `attachment filename=abstimmung${voteId}.csv`})
      res.send(csv)
    } else if (requestDataType === 'json') {
      res.json(data)
    } else {
      throw new Error('requested data-type is unknown. request "?data-type=<json|csv]>"')
    }
  } catch (error) {
    console.log(error)

    res.status(error.status || 500).json({status: 'failed', message: error.message})
  }
})

export default router
