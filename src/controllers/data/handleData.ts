import dataHandlers from '../../services/data/dataHandlers'
import OutputData from '../../models/outputData'

export const handleData = async function handleData(voteId: string): Promise<OutputData[]> {
  try {
    const rawData = await dataHandlers.getData(voteId)

    const shapedData = dataHandlers.shapeDataToJson(rawData)

    const output = dataHandlers.handleSpecialCasesJson(rawData, shapedData)
    console.log(output)

    return output
  } catch (error) {
    return error
  }
}
