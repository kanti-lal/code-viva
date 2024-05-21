import React from 'react'

const FormTitle = ({title, className}) => {
  return (
    <h1 className={`font-jost text-[26px] w-full  text-center font-semibold ${className} `}>{title}</h1>
  )
}
export default FormTitle