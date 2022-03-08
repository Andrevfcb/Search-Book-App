import React from 'react'

const Book = ({ book }) => {
    let description = ''
    if(book.volumeInfo.description) {
        const descriptionArray = book.volumeInfo.description.split(" ")
        const maxWords = 15
        for(let i = 0; i < descriptionArray.length; i++) {
            if(i > maxWords) break;
            description = description + " " + descriptionArray[i]
            if (i === maxWords) description = description + "..."
        }
    }
    
    return (
    <li className='book'>
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}
        <div>
          {book.volumeInfo.title && <h2>{book.volumeInfo.title}</h2>}
          {description && <p>{description}</p>}
        </div>
      </li>
  )
}

export default Book