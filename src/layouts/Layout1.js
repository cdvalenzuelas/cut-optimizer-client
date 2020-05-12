import React from 'react'

import Header from '../components/Header'

const Layout1 = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout1
