import React, { useState, useEffect, useRef } from 'react'
import Modal, { ModalContent } from '../modal/Modal';
import './hero-slide.css'
import Button, { OutlineButton } from '../button/Button';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from  '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';

const HeroSlide = () => {
    const [movieItems, setMovieItems] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try { 
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                console.log(response);
                setMovieItems(response.results[Math.floor(Math.random() * response.results.length - 1)]);
                console.log(response);
            } catch {
                console.log('error');
            }
        } 
        getMovies();
    }, []);

console.log('movie-items',movieItems);

    return (
        <div className="hero-slide">
            <HeroItem movie={movieItems} />
            <TrailerModal movie={movieItems} />
        </div>
    )
}


const HeroItem = (props) => {
    const item = props.movie;
    const navigate = useNavigate();
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            console.log("video:",videos);
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
            console.log("src",videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }
    

    return (
        <div
            className="hero-slide__item active"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() =>  navigate('/movie/' + item.id) }>
                            Read More
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = ({ movie }) => {

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${movie.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;



