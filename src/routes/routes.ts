//eslint-disable-next-line
const router = require('express').Router()

import { Request, Response, NextFunction } from 'express'

import { router as auth, authRequired } from '../config/oauth2'

import chartMachine from './charts/chartMachine'
import dataMachine from './data/dataMachine'

router.get('/dashboard', authRequired, (req: Request, res: Response) => {
  res.sendFile('/public/index.html', { root: (global as any).__basedir })
})

router.use('/chart-machine/machine', chartMachine)

router.use('/chart-machine/data', dataMachine)

router.get('/auth/login', auth)

router.get(
  '/',
  authRequired,
  (req: Request, res: Response, next: NextFunction) =>
    res.redirect('/dashboard')
)

export { router }
