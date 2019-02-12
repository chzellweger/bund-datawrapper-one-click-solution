const chartHandlers = require('./chartHandlers')

let state = {
  vote1: {
    running: false,
    interval: null
  },
  vote2: {
    running: false,
    interval: null
  }
}

const handleCharts = async ({action, vote}) => {
  console.log('from controller')
  console.log({action, vote})

  try {
    const result = await handleVote(action, vote)
    return result
  } catch(error) {
    return new Error(error)
  }
}

async function handleVote(action, vote) {
  if (/*action === 'start' && state['vote' + vote]['running'] === false*/true) {
    console.log('spinning up chart-machine...')
    state['vote' + vote]['running'] = true

    try {
      const id = await chartHandlers.createChart(vote)
      console.log('now your chart has the id: ' + id)

      console.log('now: add data...')
      const result = await chartHandlers.addData(vote, id)
      console.log(result)

      console.log('now, style the chart...')
      const styledChart = await chartHandlers.editChart(id, vote)
      console.log(styledChart)

      console.log('now, publish your chart...')
      const publicUrl = await chartHandlers.publishChart(id)
      console.log(publicUrl)

      // interval = setInterval(() => {
      //   console.log('hello world again...')
      //   // updateChart(id)
      // }, 600);

      return publicUrl

    } catch(error) {
      console.log(error)
      return new Error(error)
    }


  } else if (action === 'stop' && state['vote' + vote]['running'] === true) {
    state['vote' + vote]['running'] = false
    clearInterval(interval)

    return {action, running: state['vote' + vote]['running']}
} else {
  console.log('chart-machine not running...or already running!')
  return {action, state: 'unknown'}
  }
}

module.exports = handleCharts
