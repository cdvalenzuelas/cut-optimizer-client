// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

// Components
import Layout1 from '../../layouts/Layout1'
import SideBar from '../../components/SideBar'
import MainInput from '../../components/MainInput'

const CutOptimizer = () => {
  const { mode, currentShape } = useSelector(state => state.cutOptimizer)

  return (
    <Layout1>
      <SideBar />
      {mode === 'input' && currentShape >= 0 && <MainInput />}
    </Layout1>
  )
}

export default CutOptimizer
