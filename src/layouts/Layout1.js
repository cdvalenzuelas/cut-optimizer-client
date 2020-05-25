import React from 'react'

import Header from '../components/Header'

const Layout1 = ({ children }) => {
  return (
    <div className='Layout1'>
      <Header />
      {children}
    </div>
  )
}

export default Layout1
