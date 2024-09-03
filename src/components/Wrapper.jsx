import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className='w-4/12 mx-auto md:w-4/5 '>{children}</div>
  )
}

export default Wrapper