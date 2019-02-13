const chartHandlers = require('./chartHandlers');

const handleCharts = async (vote) => {
  console.log('spinning up chart-machine...');

  try {
    const id = await chartHandlers.createChart(vote);
    console.log('now your chart has the id: ' + id);

    console.log('now: add data...');
    await chartHandlers.addData(vote, id);

    console.log('now, style the chart...');
    await chartHandlers.editChart(id, vote);

    console.log('now, publish your chart...');
    const publicUrl = await chartHandlers.publishChart(id);
    console.log(publicUrl);

    return publicUrl;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

module.exports = handleCharts;
