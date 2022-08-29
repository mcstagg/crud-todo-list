import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// At the top of the page, the client wants an inspirational quote which 
// is different each time the user refreshes the page. The quote should be fetched 
// from the following API: https://type.fit/api/quotes

const Quote = () => {

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
  
    fetchQuote();
    
  }, [])

  const fetchQuote = () => {
    axios.get("https://type.fit/api/quotes")
      .then(res => {
        //console.log(res);
        const randomIndex = Math.floor(Math.random() * 1644);
        setQuote(res.data[randomIndex].text);
        setAuthor(res.data[randomIndex].author);
    })
  };

  return (
    <div>
      <h5>Daily Inspiration:</h5>
      <p className='quote'><i>"{quote}"</i> <b>-{author}</b></p>
    </div>
  )
}

export default Quote;
