import React from 'react'
import { useEffect, useState } from 'react';

// TODO: At the top of the page, the client wants an inspirational quote which 
//is different each time the user refreshes the page. The quote should be fetched 
//from the following API: https://type.fit/api/quotes

const Quote = () => {

  const [data, setData] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
  
    fetchQuote();
    
  }, [])

  const fetchQuote = async () => {
    await fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        //console.log(`Fetched Data: ${JSON.stringify(data)}`);
        setData(data);
    });
  };

  return (
    <div>
      <h3>Quote</h3>
      {data.map((quote, i) => {
        return (
          <li key={i}>{quote.text}</li>
        ) 
      })}
    </div>
  )
}

export default Quote;
