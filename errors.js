const fetch = require('node-fetch')

function getData(url) {
  return fetch(url)
  .then(res => res.json()).then(json => json.value).catch(e => {
    console.log(e)
    console.log(new Error(e))
    // return e
    return new Error(e)
    // throw new Error(e)
  })
}

async function handleData() {
  try {
    const data = await getData('https://api.chucknorrrrrrrris.io/jokes/random')
    return data
  } catch (e) {
    return e
    // return new Error(e)
    // throw new Error(e)
  }
}

async function dataMachine() {
  try {
    const data = await handleData()
    console.log(data)
  } catch (e) {
    // console.log(e)
  }
}

dataMachine()
