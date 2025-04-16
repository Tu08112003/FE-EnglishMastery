import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Button.jsx'
import PropTypes from 'prop-types'
import image_exame from '../../assets/images/img-exame.png'

const ExamCard = ({ title, onClick }) => {
  return (
    <div className="
      flex flex-col items-center justify-center gap-3 p-4 
      border-2 border-gray-200 rounded-2xl shadow-sm
      transition duration-300 ease-in-out transform 
      hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:border-[#2C99E2] hover:shadow-blue-200 cursor-pointer 
      w-full max-w-xs
    "
      onClick={onClick}
    >
      <img src={image_exame} alt='' className='object-contain w-48 h-32' />
      <h1 className='text-2xl font-semibold text-center'>{title}</h1>
      <div className='flex flex-col items-center text-[#49719C] font-medium'>
        <span className='flex items-center gap-2'>
          <FontAwesomeIcon icon="fa-regular fa-clock" />
          120 phút
        </span>
        <span className='text-center'>
          7 phần thi | 200 câu hỏi
        </span>
      </div>
      <Button
        text="Chi tiết"
        variant='default'
        size='lg'
      />
    </div>
  )
}

ExamCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ExamCard
