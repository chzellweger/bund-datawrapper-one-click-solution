//eslint-disable-next-line
const router = require('express').Router()

const chartMachine = require('./charts/chartMachine')
const dataMachine = require('./data/dataMachine')

router.use('/machine', chartMachine)
router.use('/data', dataMachine)

module.exports = router
