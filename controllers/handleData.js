const dataHandler = require('../controllers/dataHandler')

async function handleData(vote) {
  const data = await dataHandler(vote)
  return data
}

module.exports = handleData