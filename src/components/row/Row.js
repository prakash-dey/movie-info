import axios from '../../config/axios'
import { useEffect, useState } from 'react'
import './Row.css'


const baseUrl = "https://image.tmdb.org/t/p/original/"
function Row({title,fetchUrl,isLarge}) {
    // console.log(title,fetchUrl);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async()=>{
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results)
            // console.log(response.data.results[0].name);
            // console.log(movies)
            return response
        }
        fetchData();
    }, [fetchUrl])
    

  return (
    <div className='row'>
        <h2 className='row-heading'>{title}</h2>
        <div className='row-posters'>
            {movies.map((movie)=>{
               return <img className={`row-poster ${isLarge?"poster-large":""}`} src={`${baseUrl}${isLarge? movie.poster_path:movie.poster_path}` } alt={movie.name} key={movie.id}/>
            })}
        </div>
    </div>
  )
}

export default Row