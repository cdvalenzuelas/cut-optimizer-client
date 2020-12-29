import { updateDocumentById, addNewAvailableBar } from '@Firebase/cutOptimizer'
// 'https://cut-optimizer.vercel.app/'
// 'http://localhost:5001/'
const BASE_URL = 'http://localhost:5001'

export const getOptimizedBars = async (data, shapesThatChanges, currentResponse, projectId, content) => {
  try {
    let data2 = await fetch(`${BASE_URL}/optimizer`, {
      method: 'POST',
      body: JSON.stringify({ items: data, user: {} }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    data2 = await data2.json()

    data2.data.forEach((shape, index) => {
      const index2 = shapesThatChanges[index]
      currentResponse[index2] = shape
    })

    await updateDocumentById('projects', projectId, content)

    return { data: data2.data }
  } catch (err) {
    throw new Error(err)
  }
}

export const getNewStoreBars = async (uid, request, response, serverAvailableBars) => {
  try {
    const data = []
    const indexes = []

    response.forEach(({ bars }, index) => {
      const newAvailableBars = []
      const storeAvailableBars = []

      const index2 = serverAvailableBars.findIndex(({ name, material }) => name === request[index].shapeName && material === request[index].material)

      indexes.push(index2)

      bars.forEach(({ availableLength, quantity, type, length }) => {
        if (availableLength > 0) {
          newAvailableBars.push({ length: availableLength, quantity })
        }

        if (type === 'store') {
          storeAvailableBars.push({ length, quantity })
        }
      })

      const availableBarsId = serverAvailableBars[index2] ? serverAvailableBars[index2].availablebarsId : undefined
      const serverAvailableBars2 = serverAvailableBars[index2] ? serverAvailableBars[index2].data : []

      data.push({
        name: request[index].shapeName,
        material: request[index].material,
        availableBarsId,
        newAvailableBars,
        serverAvailableBars: serverAvailableBars2,
        storeAvailableBars
      })
    })

    let data2 = await fetch(`${BASE_URL}/bars_store`, {
      method: 'POST',
      body: JSON.stringify({ uid, data }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    data2 = await data2.json()

    const storeBarsPromises = []
    const newBarsPromises = []

    indexes.forEach((item, index) => {
      if (item !== -1) {
        const id = serverAvailableBars[item].availableBarsId
        const data = data2.data[index].data
        storeBarsPromises.push(updateDocumentById('availableBars', id, { data }))
      } else {
        const { name, material, data } = data2.data[index]
        newBarsPromises.push(addNewAvailableBar(uid, name, material, data))
      }
    })

    console.log(storeBarsPromises)
    console.log(newBarsPromises)

    return data2.data
  } catch (err) {
    throw new Error(err)
  }
}
