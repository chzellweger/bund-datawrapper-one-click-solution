import fetch from 'node-fetch'

import config from '../../config/config'

import { handleData } from '../../controllers/data/handleData'
import dataHandlers from '../data/dataHandlers'

async function createChart(): Promise<string> {
  console.log('creating chart...')

  const url = config.url
  const headers = config.headers

  const chartId = await fetch(`${url}/charts`, {
    headers,
    method: 'POST'
  })
    .then(async (res: any) => {
      const json = await res.json()
      return getId(json)
    })
    .catch((error: Error) => error)

  return chartId
}

async function addData(voteId: string, chartId: string): Promise<Object> {
  console.log('adding data....')

  const url = config.url
  const headers = config.headers

  const data = await handleData(voteId)
  const csv = dataHandlers.dataToCsv(data)
  console.log(csv)

  const result = await fetch(`${url}/charts/${chartId}/data`, {
    headers,
    method: 'PUT',
    body: csv
  })
    .then(async (res: any) => {
      const json = await res.json()
      return json
    })
    .catch((error: Error) => error)

  return result
}

async function editChart(voteId: string, chartId: string): Promise<Object> {
  const title = config.titles[voteId]

  const url = config.url
  const headers = config.headers

  const chartStyle = Object.assign(config.chartConfig, { title })

  const result = await fetch(`${url}/charts/${chartId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(chartStyle)
  })
    .then(async (res: any) => {
      const json = await res.json()
      return json
    })
    .catch((error: Error) => error)

  return result
}

async function publishChart(chartId: String) {
  console.log("tryin' to publish your chart...")

  const url = config.url
  const headers = config.headers

  const result = await fetch(`${url}/charts/${chartId}/publish`, {
    headers,
    method: 'POST'
  })
    .then((res: any) => res.json())
    .then((json: any) => {
      console.log(json)
      return getChartInfo(json)
    })
    .catch((error: Error) => error)

  return result
}

function getId(data: any) {
  return data.data[0].id
}

function getChartInfo(json: any) {
  return {
    chartId: json.data.id,
    publicUrl: json.data.publicUrl,
    embed: json.data.metadata.publish['embed-codes'],
    publishedAt: json.data.publishedAt
  }
}

export default {
  createChart,
  addData,
  editChart,
  publishChart,
  getId,
  getChartInfo
}
