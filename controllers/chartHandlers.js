const fetch = require('node-fetch')
const config = require('../config/config')
const dataHandler = require('./dataHandler')

async function createChart(vote) {
  console.log('creating chart...')

  const url = config.url
  const headers = config.headers

  const chartId = await fetch(url + '/charts', {
    headers, method: "POST"
  })
  .then(res => res.json())
  .then(json => json.data[0].id)
  .catch(e => new Error(e))

  return chartId
}

async function addData(vote, id) {
  console.log('adding data....')
  const data = await dataHandler(vote)

  const url = config.url
  const headers = config.headers

  const result = await fetch(`${url}/charts/${id}/data`, {
    headers,
    method: 'PUT',
    body: data
  })
  .then(res => res.json()).then(json => json)
  .catch(e => new Error(e))

  return result
}

async function editChart(chartId, voteId) {
  const title = config.titles[voteId]

  const chartStyle = Object.assign(config.chartConfig, {title})

  const url = config.url
  const headers = config.headers

  const result = await fetch(url + '/charts/' + chartId, {
    headers,
    method: "PUT",
    body: JSON.stringify(chartStyle)
  })
  .then(res => res.json())
  .then(json => json)
  .catch(e => new Error(e))

  return result
}

async function publishChart(chartId) {
  console.log('tryin\' to publish your chart...')

  const url = config.url
  const headers = config.headers

  const result = await fetch(url + '/charts/' + chartId + '/publish', {
    headers,
    method: "POST"
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
  .catch(e => new Error(e))

  return result
}

module.exports = {
  createChart,
  addData,
  editChart,
  publishChart
}
