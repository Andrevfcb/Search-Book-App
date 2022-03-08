import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Book from './Components/Book';
import * as actionCreators from './state/action-creators/index'
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles/styles.css"
import Form from './Components/Form';

function App() {
  
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const { fetchBooks, changeMaxBooksNumber, changeSearchBookTitle, changeSearchBookAuthor, changeSearchBookLanguage, changeSearchBookPublishedDate } = bindActionCreators(actionCreators, dispatch);

  const [additionalFields, setAdditionalFields] = useState(false)

  const searchButtonHandler = (e) => {
    e.preventDefault();
    console.log('test');
    
    changeMaxBooksNumber(false)
    fetchBooks(state.searchValues)
  }

  const handleAdditionalFieldsButton = () => {
    changeSearchBookAuthor("");
    changeSearchBookLanguage(false);
    changeSearchBookPublishedDate('', '');
    setAdditionalFields(prevAdditionalFields => !prevAdditionalFields)
  }

  const bookList = state.books.list.map((book, id) => {
    if(id >= state.books.maxNumber) return null
    return (
      <Book book={book} key={id} />
    )
  })

  return (
    <div className='App'>
      <h1>SEARCH BOOK APP</h1>
      <Form searchButtonHandler={searchButtonHandler} changeSearchBookTitle={changeSearchBookTitle} handleAdditionalFieldsButton={handleAdditionalFieldsButton} changeSearchBookAuthor={changeSearchBookAuthor} changeSearchBookLanguage={changeSearchBookLanguage} changeSearchBookPublishedDate={changeSearchBookPublishedDate} additionalFields={additionalFields} state={state}/>
      {state.books.list.length > 0 && <ul>
      <InfiniteScroll
          dataLength={state.books.maxNumber}
          next={() => setTimeout(() => changeMaxBooksNumber(10), 1000)}
          hasMore={state.books.maxNumber >= state.books.list.length ? false : true}
          loader={<h4>Loading...</h4>}
        >
            {bookList}
      </InfiniteScroll>
      </ul>}
    </div>
  );
}

export default App;
