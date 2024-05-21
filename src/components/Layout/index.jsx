import React, { Fragment } from 'react'
import MenuBar from './Header/Menubar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <Fragment>
      <MenuBar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default Layout