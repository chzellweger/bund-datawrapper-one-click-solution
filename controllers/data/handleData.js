const dataHandlers = require('../../controllers/services/data/dataHandlers')

async function handleData(voteId) {
  try {
    console.log('handleData')
    const data = await dataHandlers.getData(voteId)

    let output = dataHandlers.shapeData(data)

    output = dataHandlers.handleSpecialCases(output, data)
    console.log(output)

    return output
  } catch (error) {
    return error
  }
}

module.exports = handleData
