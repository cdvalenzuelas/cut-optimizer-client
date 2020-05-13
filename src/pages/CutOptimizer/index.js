// Dependencies
import React from 'react'

// Components
import Layout1 from '../../layouts/Layout1'
import ButtonsContainer from '../../components/ButtonsContainer'
import Bars from '../../components/Bars'

// Styles
import './styles.scss'

const CutOptimizer = () => {
  return (
    <div className='container'>
      <Layout1>
        <ButtonsContainer />
        <Bars />
      </Layout1>
    </div>
  )
}

export default CutOptimizer
