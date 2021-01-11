import { db, firebase } from './index'

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

export const addNewProject = (uid, name, description, tool) => {
  return db.collection('projects').add({
    name,
    description: description,
    uid,
    tool,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
    data: {
      mode: 'input',
      currentShape: -1,
      newElements: true,
      request2: '[]',
      request: [],
      response: [],
      serverAvailableBars: [],
      status: 'active'
    },
    status: 'active'
  })
    .then(data => {
      return { id: data.id, tool }
    })
    .catch(err => new Error(err))
}
