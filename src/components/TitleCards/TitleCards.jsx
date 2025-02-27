import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI0Y2JhYWNhOWUzMWU2NTVmMTc0YTNhMWM5N2JkNyIsIm5iZiI6MTc0MDY3NDg4MS42Nywic3ViIjoiNjdjMDk3NDFhNmU1NTExMTlhMzVhNmUzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.iaPGlZEfm_NgKc2_7Yk_uMPjIgiZfoH16fZeFKIDh9Q'
    }
  };



const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handleWheel);
},[])
    return (
      <div className="title-cards">
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index) => {
            return <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p> 
            </div>
          })}
        </div> 
      </div>
    )
  }

  export default TitleCards