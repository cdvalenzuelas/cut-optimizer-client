import React, { memo } from 'react'

import Header from '../components/Header'

const Layout1 = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default memo(Layout1)
