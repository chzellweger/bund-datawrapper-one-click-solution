//eslint-disable-next-line
const router = require('express').Router()

import chartMachine from './charts/chartMachine'
import dataMachine from './data/dataMachine'

router.use('/machine', chartMachine)
router.use('/data', dataMachine)

export { router }
