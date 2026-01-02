// components/ArrowIcon.tsx
import React from 'react'

const ArrowDownRight: React.FC = () => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-full w-full'
    >
      <path
        d='M7 7L17 17M17 17V7M17 17H7'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ArrowDownRight
