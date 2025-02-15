import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'


const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/* Top Bar*/}
      <Topbar/>
      {/* Navbar */}
      <Navbar/>
      {/*Cart*/}
    </header>
  )
}

export default Header
