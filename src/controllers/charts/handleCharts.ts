import chartHandlers from '../../services/charts/chartHandlers'

const handleCharts = async (voteId: string) => {
  console.log('spinning up chart-machine...')

  try {
    const chartId = await chartHandlers.createChart()
    console.log('now your chart has the id: ' + chartId)

    console.log('now: add data...')
    await chartHandlers.addData(voteId, chartId)

    console.log('now, style the chart...')
    await chartHandlers.editChart(voteId, chartId)

    console.log('now, publish your chart...')
    const publicUrl = await chartHandlers.publishChart(chartId)
    console.log(publicUrl.publicUrl)

    return publicUrl
  } catch (error) {
    return error
  }
}

export default handleCharts