const dataHandler = require('./dataHandler');

async function handleData(vote) {
  try {
    const data = await dataHandler.getData(vote);

    let output = dataHandler.shapeData(data);

    output = dataHandler.handleSpecialCases(output, data);
    console.log(output);
    return output;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

module.exports = handleData;
