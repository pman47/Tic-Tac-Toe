import React from 'react'

const Button = ({color, text, onPress}) => {
  const resultText = text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <button
        type='button'
        className={`z-10 w-full h-14 drop-shadow-xl rounded-lg text-white font-bold`}
        onClick={onPress}
        style={{
            backgroundColor: color
        }}
    >
        {resultText}
    </button>
  )
}

export default Button