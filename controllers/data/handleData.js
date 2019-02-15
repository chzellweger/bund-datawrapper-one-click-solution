const dataHandler = require('../../services/data/dataHandler')

async function handleData(voteId) {
  try {
    const data = await dataHandler.getData(voteId)

    let output = dataHandler.shapeData(data)

    output = dataHandler.handleSpecialCases(output, data)
    console.log(output)

    return output
  } catch (error) {
    return error
  }
}

module.exports = handleData
