import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className='flex justify-center items-center gap-2'>
      <button
        className='px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Trước
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1.5 rounded-md border cursor-pointer
            ${page === currentPage
              ? 'text-white border border-[#2C99E2] bg-[#2C99E2] font-bold'
              : 'text-[#49719C] border-[#49719C] hover:bg-gray-100 font-semibold'}
          `}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className='px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Tiếp
      </button>
    </div>
  )
}


export default Pagination
