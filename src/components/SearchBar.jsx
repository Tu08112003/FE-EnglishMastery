import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SearchBar = ({text, value, onChange,onKeyDown}) => {
  return (
    <div className='relative flex-1'>
        <span className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600'>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </span>
        <input 
            type="search" 
            value = {value}
            placeholder={text} 
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="w-full pl-10 font-medium px-2 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
  )
}

export default SearchBar