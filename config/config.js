const dataSource = 'https://s3.eu-central-1.amazonaws.com/app-prod-static-voteinfo/v1/ogd/20190210_kant_Abstimmungsresultate_ogd.json'

const bern = 1

const titles = {
  '1': 'Wo das Energiegesetz angenommen wurde',
  '2': 'Wo das Polizeigesetz angenommen wurde'
}

const range = Object.keys(titles).length

const dataHeaders = 'Codes,Namen,jaStimmenInProzent,jaStimmenAbsolut,neinStimmenAbsolut,stimmbeteiligungInProzent\n'

const url = 'https://api.datawrapper.de'

//eslint-disable-next-line
const token = process.env.DATAWRAPPER_TOKEN
const headers = {
  'Authorization': `Bearer ${token}`
}

const chartConfig = require('./chart')

const specialCasesMap = {
  661: {number: 669, name: 'Clavaleyres'},
  535: {number: 553, name: 'Deisswil'},
  408: {number: 410, name: 'Hellsau'},
  389: {number: 383, name: 'Meienried'},
  877: {number: 888, name: 'Niedermuhlern'},
  422: {number: 416, name: 'Rüti b. Lyssach'},
  664: {number: 304, name: 'Golaten'}
}

module.exports = {
  bern,
  chartConfig,
  dataHeaders,
  dataSource,
  headers,
  specialCases,
  specialCasesMap,
  titles,
  url
}
