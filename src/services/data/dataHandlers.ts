import fetch from 'node-fetch'
import { parse as json2csv } from 'json2csv'

import OutputData from '../../models/outputData'
import { SourceData, Vorlage, Gemeinde } from '../../models/sourceData'

import config from '../../config/config'
import { DataColumnHeaders } from '../../models/lib'

const url = config.dataSource
const bern = config.bern

async function getData(voteId: string): Promise<Vorlage> {
  const vote = parseInt(voteId) - 1

  return fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(
      async (res): Promise<SourceData> => {
        const contentType = res.headers.get('content-type')
        console.log(contentType)

        if (contentType === 'application/octet-stream') {
          let s = await res.text()
          s = s.trim()
          const json = JSON.parse(s)
          return json
        } else if (contentType === 'application/json') {
          return res.json()
        } else {
          throw new Error(`content type unknown. Type: ${contentType}`)
        }
      }
    )
    .then((data: SourceData) => {
      const voteData = data.kantone[bern]['vorlagen'][vote]
      return voteData
    })
    .catch((error: any) => {
      return error
    })
}

function shapeDataToJson(data: Vorlage): Array<any> {
  const output = data.gemeinden.map(shapeGemeinde)
  return output
}

function shapeGemeinde(g: Gemeinde): Object {
  const h: DataColumnHeaders = config.dataColumnHeaders

  return {
    [h['code']]: g.geoLevelnummer,
    [h['name']]: g.geoLevelname,
    [h['yesInPercent']]: g.resultat.jaStimmenInProzent || 0,
    [h['yesAbsolute']]: g.resultat.jaStimmenAbsolut || 0,
    [h['noAbsolute']]: g.resultat.neinStimmenAbsolut || 0,
    [h['participationInPercent']]: g.resultat.stimmbeteiligungInProzent || 0
  }
}

function handleSpecialCasesJson(
  data: Vorlage,
  input: OutputData[]
): Array<any> {
  const specialCases = Object.keys(config.specialCasesMap).map((el) =>
    parseInt(el)
  )

  const handledSpecialCases = specialCases.map((el) =>
    handleSpecialCase(el, data)
  )

  return [...input, ...handledSpecialCases]
}

function handleSpecialCase(specialCase: number, data: Vorlage): any {
  const specialCasesMap = config.specialCasesMap
  const h = config.dataColumnHeaders

  const specialCaseMappedNumber = specialCasesMap[specialCase]['number']

  const mappedGemeinde = data.gemeinden.find((el: any) => {
    return specialCaseMappedNumber.toString() === el.geoLevelnummer
  })

  return {
    [h['code']]: specialCase.toString(),
    [h['name']]: specialCasesMap[specialCase]['name'],
    [h['yesInPercent']]: mappedGemeinde!.resultat.jaStimmenInProzent || 0,
    [h['yesAbsolute']]: mappedGemeinde!.resultat.jaStimmenAbsolut || 0,
    [h['noAbsolute']]: mappedGemeinde!.resultat.neinStimmenAbsolut || 0,
    [h['participationInPercent']]:
      mappedGemeinde!.resultat.stimmbeteiligungInProzent || 0
  }
}

function dataToCsv(data: OutputData[]): string {
  const headers = config.dataColumnHeaders

  const fields = [
    headers.code,
    headers.name,
    headers.yesInPercent,
    headers.yesAbsolute,
    headers.noAbsolute,
    headers.participationInPercent
  ]

  const csvOutput = json2csv(data, { fields })
  return csvOutput
}

export default {
  getData,
  shapeDataToJson,
  shapeGemeinde,
  handleSpecialCasesJson,
  handleSpecialCase,
  dataToCsv
}
