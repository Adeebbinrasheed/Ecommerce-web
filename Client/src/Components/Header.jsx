import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className=' flex items-center justify-between bg-slate-200 p-4 px-5 fixed w-full z-10 shadow-lg '>
        <div className='font-bold text-xl text-blue-800'>
          <h1>NexGen</h1>
        </div>
        <div className='flex space-x-4'>
          <Link to='/'>Home</Link>
          <Link to='/product'>Product</Link>
          <Link>Cart</Link>
          <Link>About</Link>
        </div>
        <div>
          <Link to='/login'>Login</Link>
        </div>
    </div>
  )
}

export default Header