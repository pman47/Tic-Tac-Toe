import React from 'react'

const Button = ({color, text, onPress}) => {
  return (
    <button type='button' className={`z-10 w-full h-14 shadow-md rounded-lg text-white bg-[#F2C94C] font-bold`} onClick={onPress}>
        {text}
    </button>
  )
}

export default Button