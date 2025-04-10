import React, {useState} from 'react'
import Button from '../components/Button.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../components/SearchBar.jsx'
import {ResultCard as DictionaryResultCard} from '../components/Dictionary/ResultCard.jsx'
const Dictionary = () => {

  const [searchVocabulary, setSearchVocabulary] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchVocabulary.trim()) {
      setHasSearched(true)
    }
  }

  const handleClearResults = () => {
    setSearchVocabulary("")
    setHasSearched(false)
  }

  const fakeWordData = {
    word: "believe",
    phonetic: "/bɪˈliːv/",
    definitions: [
      "Tin tưởng, cho rằng điều gì đó là đúng",
      "Có niềm tin vào sự tồn tại của Chúa hoặc các vị thần",
      "Nghĩ rằng ai đó nói sự thật hoặc có thể tin tưởng được"
    ],
    synonyms: [
      "trust", "accept", "think", "suppose", "presume", "assume", "understand"
    ]
  };
  

  return (
    <main className="flex flex-col justify-center items-center">
      {/* Search */}
      <section className="container py-12 flex flex-col justify-center items-center gap-4">
        <div className="mx-auto max-w-3xl w-full flex flex-col gap-4">
          <div className='w-full flex items-center gap-2'>
            <SearchBar 
              text="Nhập từ vựng bạn muốn tìm kiếm" 
              value={searchVocabulary}
              onChange={(e) => setSearchVocabulary(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch()
              }}
            />
            <Button 
              text="Tìm kiếm" 
              variant="primary" 
              size="sm" 
              onClick={handleSearch}
            />
          </div>

          {/* Button Delete */}
          <div className='flex justify-start'>
            {hasSearched && (
              <Button 
                text="Xóa kết quả" 
                variant="default" 
                size="sm" 
                onClick={handleClearResults}
              />
            )}
          </div>
        </div>

        
      </section>

      {/* Content */}
      {!hasSearched ? (
        <section className="container mb-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#E6F0FA]">
              <FontAwesomeIcon icon="fa-solid fa-book" size="5x" style={{color: "#2C99E2"}} />
            </div>
            <h1 className="mb-4 text-3xl font-bold">Bắt đầu tra từ điển</h1>
            <p className="max-w-md text-muted-foreground">
              Nhập từ bạn muốn tra cứu vào ô tìm kiếm phía trên để xem định nghĩa, cách phát âm và các từ đồng nghĩa.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mb-20 flex justify-center items-center">
          <DictionaryResultCard 
            wordData={fakeWordData} 
            query={searchVocabulary}
          />
        </section>
      )}

  </main>
  )
}

export default Dictionary