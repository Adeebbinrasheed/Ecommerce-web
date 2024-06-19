import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex items-center justify-between bg-slate-200 p-3 px-5 '>
        <div>
          <h1>logo</h1>
        </div>
        <div className='flex space-x-10'>
          <Link>Home</Link>
          <Link>Product</Link>
          <Link>Cart</Link>
          <Link>About</Link>
        </div>
        <div>
          <h1>Login</h1>
        </div>
    </div>
  )
}

export default Header