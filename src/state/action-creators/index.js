import axios from 'axios';

export const changeSearchBookTitle = (inputValue) => {
    
    return (dispatch) => {
        dispatch({
            type: 'titleChange',
            payload: inputValue.trim()
        })
    }
}

export const changeSearchBookAuthor = (inputValue) => {
    return (dispatch) => {
        dispatch({
            type: 'authorChange',
            payload: inputValue.trim()
        })
    }
}

export const changeSearchBookLanguage = (language) => {
    
    return (dispatch) => {
        dispatch({
            type: 'languageChange',
            payload: language
        })
    }
}

export const changeSearchBookPublishedDate = (startDate, endDate) => {
    return (dispatch) => {
        dispatch({
            type: 'publishedDateChange',
            payload: {
                startDate,
                endDate
            }
        })
    }
}

export const changeMaxBooksNumber = (number) => {
    return (dispatch) => {
        dispatch({
            type: 'changeNumber',
            payload: number
        })
    }
}

export const fetchBooks = (searchValues) => {
    return async (dispatch) => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q="${searchValues.title.replace(/ /g, "+")}"&maxResults=40`)
        let books = response.data.items

        if(searchValues.author) {
            books = books.filter(book => {
                if(book.volumeInfo.authors && book.volumeInfo.authors.length > 0) {
                    const searchAuthor = searchValues.author.toUpperCase().split(" ")
                    const bookAuthors = book.volumeInfo.authors.map((author, i) => {
                        return author.toUpperCase().split(" ")
                    })
                    const foundAuthors = []
                    searchAuthor.forEach(author => bookAuthors.flat().includes(author) && foundAuthors.push(author))
                    return foundAuthors.length >= searchAuthor.length
                }
            })
        }
        
        if(searchValues.language) {
            books = books.filter(book => book.volumeInfo.language === searchValues.language)
        }

        if(searchValues.publishedDate.startDate && searchValues.publishedDate.endDate) {
            const startDate = new Date(searchValues.publishedDate.startDate).getTime()
            const endDate = new Date(searchValues.publishedDate.endDate).getTime()
            books = books.filter(book => {
                const publishedDate = new Date(book.volumeInfo.publishedDate).getTime()
                return publishedDate >= startDate && publishedDate <= endDate
            })
        } else if(searchValues.publishedDate.startDate || searchValues.publishedDate.endDate) {
            let date
            if(searchValues.publishedDate.startDate) {
                date = new Date(searchValues.publishedDate.startDate).getTime()
                books = books.filter(book => new Date(book.volumeInfo.publishedDate).getTime() >= date)
            } else {
                date = new Date(searchValues.publishedDate.endDate).getTime()
                books = books.filter(book => new Date(book.volumeInfo.publishedDate).getTime() <= date)
            }
        }
        dispatch({
            type: 'fetch',
            payload: books
        })
    }
}
