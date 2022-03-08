import React from 'react'

const AdditionalFields = ({ changeSearchBookAuthor, changeSearchBookLanguage, changeSearchBookPublishedDate, additionalFields, state }) => {

    const languages = ['pl', 'en', 'de', 'ru', 'fr']

    return (
    <div className={`additives ${additionalFields && 'active'}`}>
        <div className='additives__container'>
            <div className='additives-author'>
                <label>Author</label>
                <input 
                type='text' 
                placeholder='author'
                onChange={(e) => changeSearchBookAuthor(e.target.value)}
                />
            </div>
            <div className='additives-language'>
                <label>Language</label>
                <select 
                className={`${!state.searchValues.language && 'default'}`}
                onChange={(e) => changeSearchBookLanguage(e.target.value)} 
                >
                <option value={false} className='default'>Choose language</option>
                {languages.map((language, index) => <option key={index} value={language} style={{color: "black"}}>{language.toUpperCase()}</option>)}
                </select>
            </div>
        </div>
        <div className='additives-date'>
            <label>Published date</label>
            <div className='additives__container'>
            <div>
                <label htmlFor='date-start'>from: </label>
                <input 
                type='date' 
                name='date-start'
                id='date-start'
                className={`${!state.searchValues.publishedDate.startDate && 'default'}`}
                onChange={(e) => changeSearchBookPublishedDate(e.target.value, false)}
                />
            </div>
            <div>
                <label htmlFor='date-end'>to: </label>
                <input 
                type='date'
                id='date-end'
                name='date-end'
                className={`${!state.searchValues.publishedDate.endDate && 'default'}`}
                onChange={(e) => changeSearchBookPublishedDate(false, e.target.value)}
                />
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdditionalFields