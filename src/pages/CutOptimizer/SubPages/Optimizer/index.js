import React, { memo } from 'react'
import Layout1 from '@Layouts/Layout1'
import SideBar from '../../Components/SideBar'
import MainInput from '../../Components/MainInput'
import MainOutput from '../../Components/MainOutput'

const Optimizer = ({ history, location, match }) => {
  return (
    <Layout1>
      <SideBar />
      <MainInput />
      <MainOutput />
    </Layout1>
  )
}

export default memo(Optimizer)
