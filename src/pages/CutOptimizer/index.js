// Dependencies
import React from 'react'
import { useSelector } from 'react-redux'

import Layout1 from '../../layouts/Layout1'
import SideBar from '../../components/SideBar'
import MainInput from '../../components/MainInput'
import MainOutput from '../../components/MainOutput'

const CutOptimizer = () => {
  const { mode, currentShape } = useSelector(state => state.cutOptimizer)

  return (
    <Layout1>
      <SideBar />
      {mode === 'input' && currentShape >= 0 ? <MainInput /> : <MainOutput />}
    </Layout1>
  )
}

export default CutOptimizer
