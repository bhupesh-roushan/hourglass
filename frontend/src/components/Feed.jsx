import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 bg-black h-screen my-8 flex flex-col items-center pl-[20%]'>
        <Posts/> 
    </div>
  )
}

export default Feed