import React from 'react'

const SpinnerLoader = ({ size, white, grey, className }) => {
  const greyClass = grey ? 'text-grey-200' : ''
  const whiteClass = white ? 'text-white' : ''
  const defaultClass =
    'text-white inline-block rounded-full animate-spin border-2 border-l-secondary-200'

  return (
    <span
      className={`w-${size} h-${size} ${whiteClass} ${greyClass} ${defaultClass} ${className}`}
    />
  )
}

export default SpinnerLoader

