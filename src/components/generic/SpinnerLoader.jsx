import React from 'react'

const SpinnerLoader = ({ size, white, purple, className }) => {
  const purpleClass = purple ? 'text-primary' : ''
  const whiteClass = white ? 'text-white' : ''
  const defaultClass =
    'text-white inline-block rounded-full animate-spin border-2 border-l-secondary-200'

  return (
    <span
      className={`w-${size} h-${size} ${whiteClass} ${purpleClass} ${defaultClass} ${className}`}
    />
  )
}

export default SpinnerLoader

