/* eslint-disable jsx-a11y/alt-text */

import React, {useState} from 'react';
import './App.css';
import { Heading } from './components/Heading';

import { Loader } from './components/Loader';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [value,setValue]= useState("")
  const [results,setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [images, setImage,item] = useState([]);

  const fetchImages = ()=>{
    const apiRoot = "https://api.unsplash.com";
    const timestamp = Date.now();
    
     fetch(`https://api.unsplash.com/search/photos?client_id=m6SplDieHiS68r4MqpxZlXjCYLmFsjQr_xtjDX1y_D4&query=${value}?t=${timestamp}`)
       .then(res=>res.json())
       .then(data=>{
           console.log(data)
           setResults(data.results)
           

       }
        
        )
  }
  return (
    <div className="App">
    <div className="mydiv">
    <span>Search</span>

    <input type="text"
     style={{width:"60%"}}
     value={value} 
     onChange={(e)=>setValue(e.target.value)}/> 
    <button onClick={()=>fetchImages()}>Send</button>
    
    </div>

    <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <WrapperImages>
          {images.map(image => (
            <img className="item" key={item.id} src={item.urls.regular}/>
          ))}
        </WrapperImages>
      </InfiniteScroll>
    <div className="gallery">
    {
        results.map((item)=>{


  return <img className="item" key={item.id} src={item.urls.regular}/>
  



        })

    }
    
    
    </div>
     </div>
  );
}

export default App;
