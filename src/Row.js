import React, {useState, useEffect} from 'react'
import YouTube from 'react-youtube';
import axios from "./axios";
import "./Row.css";
import movieTrailer from 'movie-trailer';
const BASE_URL ="https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            //console.log(movies);
            return request;
        }

        fetchData();
    }, [fetchUrl]); 

    //console.log(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars:{
            autoplay: 1
        }
    };

    const handleClick = (movie) => {
        console.log("handling click: " + trailerUrl);
        if(trailerUrl){
            setTrailerUrl('');
            console.log("close window");
        } else {
            console.log("open window " + movie?.title + " " +movie?.name );
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "").then( url => {
                const urlParams = new URLSearchParams( new URL(url).search );
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error))

        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}` }
                        onClick={() => handleClick(movie)}
                        src={BASE_URL + (isLargeRow ? movie.poster_path: movie.backdrop_path)} 
                        alt={movie.title}
                    
                        /> 
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;
