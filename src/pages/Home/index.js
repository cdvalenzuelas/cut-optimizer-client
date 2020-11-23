import React, { memo } from 'react'
import Layout1 from '@Layouts/Layout1'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Layout1>
      <main className='Main'>
        <Link to='/cutOptimizer'>CutOptimizer</Link>
        <Link to='/projects'>Projects</Link>
      </main>
    </Layout1>
  )
}

export default memo(Home)
