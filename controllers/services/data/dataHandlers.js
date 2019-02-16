const fetch = require('node-fetch')
const config = require('../../../config/config')

const url = config.dataSource
const bern = config.bern

async function getData(voteId) {
  console.log(getData, voteId)
  const vote = parseInt(voteId) - 1

  return fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then((res) => {
      const contentType = res.headers.get('content-type')
      console.log(contentType)

      if (contentType === 'application/octet-stream') {
        return res.text().then((s) => {
          s = s.trim()
          const json = JSON.parse(s)
          return json
        })
      } else if (contentType === 'application/json') {
        return res.json()
      } else {
        throw new Error(`content type unknown. Type: ${contentType}`)
      }
    })
    .then((data) => {
      const voteData = data.kantone[bern]['vorlagen'][vote]
      return voteData
    })
    .catch((error) => {
      return error
    })
}

function shapeData(data) {
  //'Codes,Namen,jaStimmenInProzent,jaStimmenAbsolut,neinStimmenAbsolut,stimmbeteiligungInProzent\n'
  const headers = config.dataHeaders
  const specialCases = Object.keys(config.specialCasesMap)

  let output = headers

  data.gemeinden.forEach((g) => {
    if (specialCases.includes(g.geoLevelnummer)) {
      return
    }

    const code = g.geoLevelnummer
    const name = g.geoLevelname
    const yesPercent = g.resultat.jaStimmenInProzent || 0
    const yesAbsolute = g.resultat.jaStimmenAbsolut || 0
    const noAbsolute = g.resultat.neinStimmenAbsolut || 0
    const participation = g.resultat.stimmbeteiligungInProzent || 0

    output += `${code},${name},${yesPercent},${yesAbsolute},${noAbsolute},${participation}\n`
  })

  return output
}

function handleSpecialCases(inputString, data) {
  let outputString = inputString

  const specialCases = Object.keys(config.specialCasesMap)
  const specialCasesMap = config.specialCasesMap

  specialCases.forEach((specialCase) => {
    const specialCaseMappedNumber =
      specialCasesMap[specialCase]['number']

    const mappedGemeinde = data.gemeinden.find((el) => {
      return specialCaseMappedNumber.toString() === el.geoLevelnummer
    })

    const number = specialCase
    const name = specialCasesMap[specialCase.toString()]['name']
    const jaStimmenInProzent = mappedGemeinde.resultat.jaStimmenInProzent
    const jaStimmenAbsolut = mappedGemeinde.resultat.jaStimmenAbsolut
    const neinStimmenAbsolut = mappedGemeinde.resultat.neinStimmenAbsolut
    const stimmbeteiligungInProzent =
      mappedGemeinde.resultat.stimmbeteiligungInProzent

    const row = `${number},${name},${jaStimmenInProzent},${jaStimmenAbsolut},${neinStimmenAbsolut},${stimmbeteiligungInProzent}\n`

    console.log(row)

    outputString += row
  })
  return outputString
}

module.exports = {
  getData,
  shapeData,
  handleSpecialCases
}
