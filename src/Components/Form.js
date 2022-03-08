import React from 'react'
import AdditionalFields from './AdditionalFields';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

const Form = ({ searchButtonHandler, changeSearchBookTitle, additionalFields, handleAdditionalFieldsButton, changeSearchBookAuthor, changeSearchBookLanguage, changeSearchBookPublishedDate, state }) => {

  return (
    <form onSubmit={searchButtonHandler} data-testid="form">
        <div className='title-container'>
          <label htmlFor='title'>Book title</label>
          <input 
          type='text'
          id='title'
          name='title' 
          placeholder='title'
          onChange={(e) => changeSearchBookTitle(e.target.value)}
          />
        </div>
        <p>
          {additionalFields && <span onClick={handleAdditionalFieldsButton}>Hide additional fields <FontAwesomeIcon icon={faCircleArrowUp} /></span>}
          {!additionalFields && <span onClick={handleAdditionalFieldsButton}>Show additional fields <FontAwesomeIcon icon={faCircleArrowDown} /></span>}
          </p>
        <AdditionalFields 
        changeSearchBookAuthor={changeSearchBookAuthor} 
        changeSearchBookLanguage={changeSearchBookLanguage} 
        changeSearchBookPublishedDate={changeSearchBookPublishedDate} 
        additionalFields={additionalFields}
        state={state}
        />
        <div>
          <button
          className={`${!state.searchValues.title && 'disabled'}`}
          type='submit'
          disabled={!state.searchValues.title && true}
          >SEARCH</button>
        </div>
        </form>
  )
}

export default Form