import { Request, Response, NextFunction } from 'express'

import config from '../../config/config'

export function checkParams(req: Request, res: Response, next: NextFunction) {
  const voteId: string = req.params.voteId
  if (voteId > config.range.toString()) {
    res.status(400).json({
      status: 'failed',
      message: `use a vote id in range, range is 1 to ${config.range}`
    })
    return
  }

  if (!Number.isInteger(parseInt(voteId))) {
    res.status(400).json({
      status: 'failed',
      message: `cannot create chart with vote-id ${voteId}. Use an integer as vote-id.`
    })
    return
  }
  next()
  }
