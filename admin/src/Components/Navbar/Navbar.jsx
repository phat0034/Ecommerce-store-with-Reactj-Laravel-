import React from 'react'
import { useState } from 'react'
import reacticon from '../../assets/react.svg'
import { useLocation,Link  } from 'react-router-dom'
function Navbar () {
  const [isClick, setIsClick] = useState(false)

  return (
    <div className='navBar px-16'>
      <div className='flex justify-between p-6'>
        <div className='iconNav my-auto'>
          <Link to='' className='text-3xl '>
            Admin Tech
          </Link>
        </div>
        <div className='inforAdmin relative'>
          <div
            className=' bg-black w-10 h-10 p-2 rounded-full'
            onClick={() => {
              setIsClick(prev => !prev)
            }}
          >
            <img src={reacticon} alt='' />
          </div>

          {isClick && (
            <div className='absolute right-1 mt-2 bg-[#6e6e6e] p-10 rounded-lg w-80 h-[300px]'>
              <ul>
                <li>
                  <Link to=''>Logout</Link>
                </li>
                <li>
                  <Link to=''></Link>
                </li>
                <li>
                  <Link to=''></Link>
                </li>
                <li>
                  <Link to=''></Link>
                </li>
                <li>
                  <Link to=''></Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
