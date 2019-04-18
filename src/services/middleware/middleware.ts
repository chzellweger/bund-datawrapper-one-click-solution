const fetch = require('node-fetch')

import { Request, Response, NextFunction } from 'express'

import config from '../../config/config'

export function checkParams(req: Request, res: Response, next: NextFunction) {
  const voteId: string = req.params.voteId
  if (!Number.isInteger(parseInt(voteId))) {
    res.status(400).json({
      status: 'failed',
      message: `cannot create chart with vote-id ${voteId}. Use an integer as vote-id.`
    })
    return
  }

  if (parseInt(voteId) > config.range) {
    res.status(400).json({
      status: 'failed',
      message: `use a vote id in range, range is 1 to ${config.range}`
    })
    return
  }

  next()
}

export async function checkLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const url = config.url
  const headers = config.headers
  const loggedIn = await fetch(`${url}/account`, { headers })
    .then((res: any) => res.json())
    .then((res: any) => {
      console.log(res.data.user.id)
      return res.data.user.id
    })

  if (loggedIn) {
    req.loggedIn = true
  } else {
    req.loggedIn = false
  }
  next()
}
