import React from 'react'
import { RingLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="h-[60vh] grid place-items-center">
      <RingLoader />
    </div>
  )
}

export default Loader
