import { db, firebase } from './index'

export const getAvailableBarsByNameAndMaterial = (uid, shapeName, material) => {
  return db.collection('availableBars')
    .where('uid', '==', uid)
    .where('name', '==', shapeName)
    .where('material', '==', material)
    .get()
    .then(data => {
      const data2 = []

      data.forEach(store => {
        data2.push({
          availableBarsId: store.id,
          ...store.data()
        })
      })

      return data2.data
    })
    .catch(err => new Error(err))
}

export const updateDocumentById = (collection, id, content) => db.collection(collection).doc(id).update(content)

export const getAvailableBarsByUser = uid => {
  return db.collection('availableBars').where('uid', '==', uid).get()
    .then(data => {
      const data2 = []

      data.forEach(store => {
        data2.push({
          availableBarsId: store.id,
          ...store.data()
        })
      })

      return data2
    })
    .catch(err => new Error(err))
}

export const getProjectsByUser = uid => {
  return db.collection('projects').where('uid', '==', uid).get()
    .then(data => {
      const data2 = []
      data.forEach(project => {
        data2.push({
          projectId: project.id,
          ...project.data()
        })
      })

      return data2
    })
    .catch(err => new Error(err))
}

export const addNewAvailableBar = (uid, name, material, data) => {
  return db.collection('availableBars').add({
    name,
    material,
    data,
    uid
  }).then(data => {
    return { id: data.id }
  }).catch(err => new Error(err))
}

export const addNewProject = (uid, name, description, tool) => {
  return db.collection('projects').add({
    name,
    description: description,
    uid,
    tool,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
    data: {}
  })
    .then(data => {
      return { id: data.id, tool }
    })
    .catch(err => new Error(err))
}
