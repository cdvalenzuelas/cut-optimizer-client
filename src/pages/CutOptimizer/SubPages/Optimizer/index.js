import React, { memo } from 'react'
import Layout1 from '@Layouts/Layout1'
import SideBar from '../../Components/SideBar'
import MainInput from '../../Components/MainInput'
import MainOutput from '../../Components/MainOutput'
import { useSelector } from 'react-redux'

const Optimizer = () => {
  const { mode } = useSelector(state => state.cutOptimizer)
  return (
    <Layout1>
      <SideBar />
      {mode === 'input' ? <MainInput /> : <MainOutput />}
    </Layout1>
  )
}

export default memo(Optimizer)
