import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Quote.css';

// At the top of the page, the client wants an inspirational quote which 
// is different each time the user refreshes the page. The quote should be fetched 
// from the following API: https://type.fit/api/quotes

const Quote = () => {

  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    fetchQuote();
  }, [])

  const fetchQuote = () => {
    axios.get("https://type.fit/api/quotes")
      .then(res => {
        console.log(res);
        // TODO: Randomize number based off of actual indecies of collection
        // instead of a hard coded value the viewd lenghth of the collection, 
        // because the length could be variable based on updates to the api
        const randomIndex = Math.floor(Math.random() * 1644);
        setQuote(res.data[randomIndex].text);
        setAuthor(res.data[randomIndex].author);
    })
    // TODO: Handle fetch errors
  };

  return (
    <div>
      <h5>Daily Inspiration:</h5>
      <p className='quote'><i>"{quote}"</i> <b>-{author}</b></p>
    </div>
  )
};

export default Quote;
