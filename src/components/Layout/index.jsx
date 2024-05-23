import React, { Fragment } from 'react'
import MenuBar from './Header/Menubar'
import Footer from './Footer'

const RootLayout = ({children}) => {
  return (
    <Fragment>
      <MenuBar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default RootLayout