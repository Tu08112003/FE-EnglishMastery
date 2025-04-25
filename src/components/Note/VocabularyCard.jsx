import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../components/Button.jsx'
const VocabularyCard = ({
  word,
  ipa,
  meaning,
  example,
  note,
  status,
  onEdit,
  onDelete,
  // onStudy
}) => {

  

  const statusStyles =
    status === "Đã học"
      ? "bg-black text-white border-gray-200"
      : "text-black border-gray-200"



  return (
    <div className="w-full border-2 border-gray-200 shadow-sm rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2 border-b-1 pb-2 border-gray-200">
        <div>
          <h3 className="font-bold text-lg">{word}</h3>
          {ipa && <div className="text-gray-600 font-medium text-sm ">{ipa}</div>}
        </div>
        <span className={`font-bold text-xs px-3 py-1 rounded-xl border-2 ${statusStyles}`}>
            {status}
        </span>
      </div>
      {meaning && <div className="mb-1 text-black font-bold">{meaning}</div>}
      {example && <div className="text-sm mb-3 text-gray-600 font-medium">{example}</div>}

      {note && (
        <div className="ml-3">
          <div className="text-xs text-gray-600 font-medium mb-1">Ghi chú:</div>
          <div className="text-sm text-gray-600 font-medium mb-3">{note}</div>
        </div>
      )}
      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="flex items-start gap-2">
 
          {/* Button edit  */}
          <Button
            variant='default'
            text='Sửa'
            size='sm'
            icon={<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />}
            iconPosition='left'
            textColor="text-gray-600"
            border="border-2 border-gray-200"
            onClick={onEdit}
          />

          {/* Button delete */}
           <Button
            variant='delete'
            text='Xóa'
            size='sm'
            icon={<FontAwesomeIcon icon="fa-solid fa-trash"/>}
            iconPosition='left'
            textColor="text-red-600"
            border="border-2 border-red-600"
            bg="bg-white"
            onClick={onDelete}
          />

        </div>

        <div className="flex">

          {/* Button study */}
          <Button
              variant='default'
              text='Học'
              size='sm'
              icon={<FontAwesomeIcon icon="fa-solid fa-book-open-reader"/>}
              iconPosition='left'
              textColor="text-gray-600"
              border="border-2 border-gray-200"
              // onClick={handleStudy}
            />
        </div>
        
      </div>

    </div>
  )
}

export default VocabularyCard
