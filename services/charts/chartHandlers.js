const fetch = require('node-fetch')
const config = require('../../config/config')

const handleData = require('../../controllers/data/handleData')

async function createChart() {
  console.log('creating chart...')

  const url = config.url
  const headers = config.headers

  const chartId = await fetch(`${url}/charts`, {
    headers, method: 'POST'
  })
  .then(res => res.json())
  .then(json => json.data[0].id)
  .catch(error => error)

  return chartId
}

async function addData(voteId, chartId) {
  console.log('adding data....')

  const url = config.url
  const headers = config.headers

  const data = await handleData(voteId)

  const result = await fetch(`${url}/charts/${chartId}/data`, {
    headers,
    method: 'PUT',
    body: data
  })
  .then(res => res.json()).then(json => json)
  .catch(error => error)

  return result
}

async function editChart(voteId, chartId) {
  const title = config.titles[voteId]

  const url = config.url
  const headers = config.headers

  const chartStyle = Object.assign(config.chartConfig, {title})

  const result = await fetch(`${url}/charts/${chartId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(chartStyle)
  })
  .then(res => res.json())
  .then(json => json)
  .catch(error => error)

  return result
}

async function publishChart(chartId) {
  console.log('tryin\' to publish your chart...')

  const url = config.url
  const headers = config.headers

  const result = await fetch(`${url}/charts/${chartId}/publish`, {
    headers,
    method: 'POST'
  })
  .then(res => res.json())
  .then(json => {
    return {
      chartId: json.data.id,
      publicUrl: json.data.publicUrl,
      embed: json.data.metadata.publish['embed-codes'],
      publishedAt: json.data.publishedAt
    }
  })
  .catch(error => error)

  return result
}

module.exports = {
  createChart,
  addData,
  editChart,
  publishChart
}
