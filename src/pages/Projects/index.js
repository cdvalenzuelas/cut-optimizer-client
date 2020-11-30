import React, { memo, useState, useEffect, useCallback } from 'react'
import { getProjectsByUser } from '@Firebase/cutOptimizer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Layout1 from '@Layouts/Layout1'
import NewProject from './Components/NewProject'
import Table from '@Components/Table'

const Projects = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.global.user || {})

  useEffect(() => {
    dispatch({ type: 'global/SET_LOADING', payload: { loading: true } })

    getProjectsByUser(uid)
      .then(data => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        data.forEach(item => {
          item.createdAt = new Date(item.createdAt.seconds * 1000).toLocaleString()
          item.lastModified = new Date(item.lastModified.seconds * 1000).toLocaleString()
        })
        setData(data)
      })
      .catch(err => {
        dispatch({ type: 'global/SET_LOADING', payload: { loading: false } })
        dispatch({ type: 'global/SET_ERROR', payload: { error: 'INTERNAL SERVER ERROR' } })
      })
  }, [])

  const handleClick = useCallback((e, item, index) => {
    dispatch({ type: 'cutOptimizer/GET_DATA_FROM_PROJECT', payload: item.data })
    history.push(`/cutOptimizer/project/${item.projectId}`)
  }, [JSON.stringify(data)])

  return (
    <Layout1>
      <main className='Main'>
        <Table
          fields={['name', 'description', 'tool', 'createdAt', 'lastModified']}
          titles={{ lastModified: 'LAST MODIFIED', createdAt: 'CREATED AT' }}
          data={data}
          editable={false}
          newRow={false}
          handleClick={handleClick}
        />
        <button className='btn-primary btn-right-bottom' onClick={e => setShowModal(true)} >New</button>
        {showModal && <NewProject setShowModal={setShowModal} />}
      </main>
    </Layout1>
  )
}

export default memo(Projects)
