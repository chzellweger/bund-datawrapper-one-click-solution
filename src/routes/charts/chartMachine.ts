import { Request, Response } from 'express'

//eslint-disable-next-line
const router = require('express').Router()

import { checkParams } from '../../services/middleware/middleware'

import handleCharts from '../../controllers/charts/handleCharts'

router.post('/:voteId', checkParams, async (req: Request, res: Response) => {
  console.log(req.params)

  const voteId: string = req.params.voteId

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

    res
      .status(error.status || 500)
      .json({ status: 'failed', message: error.message })
  }
})

export default router
